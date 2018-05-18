const csv=require('csvtojson')

var type = [];
var AddressData1 = []
var AddressData2 = []
var AddressData3 = []
var AddressData4 = []
var AddressData5 = []
var AddressData6 = []
var tags = []
var allTags = []
var fullnames = [];
var eids = [];
var class1s = [];
var class2s = [];
var invisibles = [];
var see_alls = [];
var Address = [];
var duplicate = [];
var flag = false

csv()
.fromFile('input.csv')
.on('csv',(csvRow, rowIndex)=>{
	if(eids.indexOf(csvRow[1])){
		fullnames.push(csvRow[0])
		eids.push(csvRow[1])
		class1s.push(csvRow[2])
		class2s.push(csvRow[3])
		if(csvRow[5].indexOf("(") || csvRow.indexOf(" ")){
			csvRow[5] = "55" + csvRow[5].replace("(","").replace(")", "").replace(" ", "")
		}
		if(csvRow[6].indexOf("(") || csvRow.indexOf(" ")){
			csvRow[6] = "55" + csvRow[6].replace("(","").replace(")", "").replace(" ", "")
		}
		if(csvRow[9].indexOf("(") || csvRow.indexOf(" ")){
			csvRow[9] = "55" + csvRow[9].replace("(","").replace(")", "").replace(" ", "")
		}
		AddressData1.push(csvRow[4])
		AddressData2.push(csvRow[5])
		AddressData3.push(csvRow[6])
		AddressData4.push(csvRow[7])
		AddressData5.push(csvRow[8])
		AddressData6.push(csvRow[9])
		invisibles.push(csvRow[10])
		see_alls.push(csvRow[11])
	}else{
		if(csvRow[5].indexOf("(") || csvRow.indexOf(" ")){
			csvRow[5] = "55" + csvRow[5].replace("(","").replace(")", "").replace(" ", "")
		}
		if(csvRow[6].indexOf("(") || csvRow.indexOf(" ")){
			csvRow[6] = "55" + csvRow[6].replace("(","").replace(")", "").replace(" ", "")
		}
		if(csvRow[9].indexOf("(") || csvRow.indexOf(" ")){
			csvRow[9] = "55" + csvRow[9].replace("(","").replace(")", "").replace(" ", "")
		}
		duplicate.push({
			"indexPosition" : eids.findIndex(eid => eid === csvRow[1]),
			"class1" : csvRow[2],
			"class2": csvRow[3],
			"Add1" : csvRow[4],
			"Add2" : csvRow[5],
			"Add3" : csvRow[6],
			"Add4" : csvRow[7],
			"Add5" : csvRow[8],
			"Add6" : csvRow[9],
			invisible : csvRow[10],
			see_all : csvRow[11]	
		})
	}
})
.on('header',(header)=>{
	for(var y=4; y<=9;y++){
		var prepareAddress = header[y].replace(",","").split(" ");
		type.push(prepareAddress[0])
		for (var x = 1; x<prepareAddress.length; x++){
			tags.push(prepareAddress[x])
		}
		allTags.push(tags)
		tags = []
	}	
})
.on('done',()=>{
	var alterados = []
	if( duplicate.length > 0){
		flag = true;
		for (v = 0; v<duplicate.length; v++){
			if(duplicate[v].class1.indexOf(" ,") > -1){
				duplicate[v].class1 = duplicate[v].class1.replace(", ", " / ")
			}

			if(duplicate[v].class2.indexOf(", ") > -1){
				duplicate[v].class2 = duplicate[v].class2.replace(", ", " / ")
			}
			class1s[duplicate[v].indexPosition] += " / " + duplicate[v].class1
			class2s[duplicate[v].indexPosition] += " / " + duplicate[v].class2
	
			if(duplicate[v].Add1 && duplicate[v].Add1.indexOf("@") > -1 && !(AddressData1[duplicate[v].indexPosition]) || !(AddressData1[duplicate[v].indexPosition].indexOf("@") > -1) || AddressData1[duplicate[v].indexPosition].indexOf(":") > -1){
				console.log("here1")
				AddressData1[duplicate[v].indexPosition] = duplicate[v].Add1
			}else if(duplicate[v].Add1 && duplicate[v].Add1.indexOf("@") > -1 && AddressData1[duplicate[v].indexPosition] && AddressData1[duplicate[v].indexPosition].indexOf("@") > -1){
				console.log("aqui1")
				AddressData1[duplicate[v].indexPosition] += " / " + duplicate[v].Add1
			}
			
			if(duplicate[v].Add2 && duplicate[v].Add2.length > 11 && !(AddressData2[duplicate[v].indexPosition]) || AddressData2[duplicate[v].indexPosition].length <= 11){
				console.log('here2')
				AddressData2[duplicate[v].indexPosition] = duplicate[v].Add2
			}else if(duplicate[v].Add2 && duplicate[v].Add2.length > 11 && AddressData2[duplicate[v].indexPosition] && AddressData2[duplicate[v].indexPosition].length > 11){
				console.log("aqui2")
				AddressData2[duplicate[v].indexPosition] += " / " + duplicate[v].Add2
			}

			if(duplicate[v].Add3 && duplicate[v].Add3.length > 11 && !(AddressData3[duplicate[v].indexPosition]) || (AddressData3[duplicate[v].indexPosition].length <= 11)){
				console.log('here3')
				AddressData3[duplicate[v].indexPosition] =  duplicate[v].Add3
			}else if(duplicate[v].Add3 && duplicate[v].Add3.length > 11 && AddressData3[duplicate[v].indexPosition] && AddressData3[duplicate[v].indexPosition].length > 11){
				console.log("aqui3")
				AddressData3[duplicate[v].indexPosition] += " / " + duplicate[v].Add3
			}

			if(duplicate[v].Add4 && duplicate[v].Add4.indexOf("@") > -1 && !(AddressData4[duplicate[v].indexPosition]) || !(AddressData4[duplicate[v].indexPosition].indexOf("@") > -1) || AddressData4[duplicate[v].indexPosition].indexOf(":") > -1){
				console.log('here4')
				AddressData4[duplicate[v].indexPosition] = duplicate[v].Add4
			}else if(duplicate[v].Add4 && duplicate[v].Add4.indexOf("@") > -1 && AddressData4[duplicate[v].indexPosition] && AddressData4[duplicate[v].indexPosition].indexOf("@") > -1){
				console.log("aqui4")
				AddressData4[duplicate[v].indexPosition] += " / " + duplicate[v].Add4
			}

			if(duplicate[v].Add5 && duplicate[v].Add5.indexOf("@") > -1 && !(AddressData5[duplicate[v].indexPosition]) || !(AddressData5[duplicate[v].indexPosition].indexOf("@") > -1) || AddressData5[duplicate[v].indexPosition].indexOf(":") > -1){
				console.log('here5')
				AddressData5[duplicate[v].indexPosition] = duplicate[v].Add5
			}else if(duplicate[v].Add5 && duplicate[v].Add5.indexOf("@") > -1 && AddressData5[duplicate[v].indexPosition] && AddressData5[duplicate[v].indexPosition].indexOf("@") > -1){
				console.log("aqui5")
				AddressData5[duplicate[v].indexPosition] += " / " + duplicate[v].Add5
			}

			if(duplicate[v].Add6 && duplicate[v].Add6.length > 11 && !AddressData6[duplicate[v].indexPosition] || AddressData6[duplicate[v].indexPosition].length > 11){
				console.log('here6')
				AddressData6[duplicate[v].indexPosition] = duplicate[v].Add6
			}else if(duplicate[v].Add6 && duplicate[v].Add6.length > 11 && AddressData6[duplicate[v].indexPosition] && AddressData6[duplicate[v].indexPosition].length > 11){
				console.log("aqui6")
				AddressData6[duplicate[v].indexPosition] += " / " + duplicate[v].Add6
			}

			alterados.push(duplicate[v].indexPosition)
		}
	}

	for(var x = 0; x<fullnames.length; x++){
		var temp = []
		console.log("fullname : " + fullnames[x])
		console.log("eid : " + eids[x])
		if (class1s[x]){
			if (class1s[x].indexOf("/") > -1){
				temp.push(class1s[x].split(" / "))
			}else{
				temp.push(class1s[x])
			}
		}
		if (class2s[x]){
			if (class2s[x].indexOf("/") > -1){
				temp.push(class2s[x].split(" / "))
			}else{
				temp.push(class2s[x])
			}
		}
		
		
		for (var i = 0; i<alterados.length; i++){
			if(alterados[i] === x){
				var t1 = temp[0].join().split(",")
				var t2 = temp[1].join().split(",")
				temp = t1.concat(t2).sort()
			}
		}	


		console.log("classes : " + temp)
		console.log("addresses : ")
		if(AddressData1[x] && AddressData1[x].indexOf("@") > -1){
			if(AddressData1[x].indexOf("/") > -1){
				var aux = AddressData1[x].split("/")
					for (var c = 0; c< aux.length ; c++){
						console.log({type: type[0], tags : allTags[0], address: aux[c] })
					}
			}else{
				console.log({type: type[0], tags : allTags[0], address: AddressData1[x] })
			}
		}
		if(AddressData2[x] && AddressData2[x].length > 11)
			if(AddressData2[x].indexOf("/") > -1){
				var aux = AddressData2[x].split("/")
					for (var c = 0; c< aux.length ; c++){
						console.log({type: type[1], tags : allTags[1], address: aux[c] })
					}
			}else{
				console.log({type: type[1], tags : allTags[1], address: AddressData2[x] })
			}
		if(AddressData3[x] && AddressData3[x].length > 11)
			if(AddressData3[x].indexOf("/") > -1){
				var aux = AddressData3[x].split("/")
					for (var c = 0; c< aux.length ; c++){
						console.log({type: type[2], tags : allTags[2], address: aux[c] })
					}
			}else{
				console.log({type: type[2], tags : allTags[2], address: AddressData3[x] })
			}
		if(AddressData4[x] && AddressData4[x].indexOf("@") > -1){
			if(AddressData4[x].indexOf("/") > -1){
				var aux = AddressData4[x].split("/")
					for (var c = 0; c< aux.length ; c++){
						console.log({type: type[3], tags : allTags[3], address: aux[c] })
					}
			}else{
				console.log({type: type[3], tags : allTags[3], address: AddressData4[x] })
			}
		}
		if(AddressData5[x] && AddressData5[x].indexOf("@") > -1){
			if(AddressData5[x].indexOf("/") > -1){
				var aux = AddressData5[x].split("/")
					for (var c = 0; c< aux.length ; c++){
						console.log({type: type[4], tags : allTags[4], address: aux[c] })
					}
			}else{
				console.log({type: type[4], tags : allTags[4], address: AddressData5[x] })
			}
		}
		if(AddressData6[x] && AddressData6.length > 11 )
			if(AddressData6[x].indexOf("/") > -1){
				var aux = AddressData6[x].split("/")
					for (var c = 0; c< aux.length ; c++){
						console.log({type: type[5], tags : allTags[5], address: aux[c] })
					}
			}else{
				console.log({type: type[5], tags : allTags[5], address: AddressData6[x] })
			}
		if(invisibles[x] == 1){
			console.log("invisible :" + " True")
		}else{
			console.log("invisible : " + " False")
		}
		if(see_alls[x] == "yes"){
			console.log("see_all : " + "True")
		}else{
			console.log("see_all : " + "False")
		}
	}



})
