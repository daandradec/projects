function findMeHome(){
	if (document.searchform.kmsTo.value <= 2){
		if (document.searchform.food.checked === true) {
			if (document.searchform.security.checked === true){
				if (document.searchform.moneyTo.value <= 3000) {
					document.resultform.houseTo.value = "HELL YEAH!";
				}else{
					document.resultform.houseTo.value = "GO TO AN HOTEL, BLOODY RICH!"
				}
			}else{
				document.resultform.houseTo.value = "YOU'LL BE ROBBED MANY TIMES, BRO!";
			}
		}else{
			document.resultform.houseTo.value = "ONLY MC'DONALDS, YO!";
		}
	}else{
		document.resultform.houseTo.value= "YOU CAN GO TO ANOTHER UNIVERSITY!";
	}
}	