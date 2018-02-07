function popup_search() {
	//console.log(document.getElementById('dept').value);

	chrome.tabs.executeScript({
		file: 'contentscript.js'
	});
	chrome.tabs.insertCSS(null, {
		file: 'stylesheet.css'

	});

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id,
			{department: document.getElementById('dept').value});
	});
	chrome.storage.sync.set(
		{'department': document.getElementById('dept').value}
	);
}

document.body.onload = function(){
	chrome.storage.sync.get(['department'], function(items){
		//if (items.school != undefined){
		//	document.querySelectorAll('input[type="text"]')[0].value = items.school;
		//}
		if (items.department != undefined){
			document.getElementById('dept').value = items.department;
		}

	});

	// chrome.storage.sync.get('department', function(items){
	// 	document.querySelectorAll('input[type="text"]')[1].value = items.department;
	// });

}


//document.getElementById('rmp-search').addEventListener('click', popup_search);
var selecteddepartment;
var select = document.getElementById('dept');
	select.addEventListener('change', () => {
	if(document.getElementById("dept").value == 'Select Your Department'){
		document.getElementById("status").innerHTML = "";
} else {
	selecteddepartment = select.options[select.selectedIndex].value;
	document.getElementById("status").innerHTML = "Department: " + selecteddepartment;
	document.addEventListener('click', popup_search);
	console.log(selecteddepartment);
}
});
