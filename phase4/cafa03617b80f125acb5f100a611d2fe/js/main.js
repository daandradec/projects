function show() {
    var x = document.getElementById('results');
	var y = document.getElementById('options');
	
    if (x.style.display === 'none') {
        x.style.display = 'block';
		y.style.display = 'none';
    } else {
        x.style.display = 'none';
		y.style.display = 'block';
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "40%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
