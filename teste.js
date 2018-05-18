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
			"Add1" : AddressData1[4],
			"Add2" : AddressData1[5],
			"Add3" : AddressData1[6],
			"Add4" : AddressData1[7],
			"Add5" : AddressData1[8],
			"Add6" : AddressData1[9],
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
		
		if(){
			var t1 = temp[0].join().split(",")
			var t2 = temp[1].join().split(",")

			temp = t1.concat(t2).sort()
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
			console.log({type: type[1], tags : allTags[1], address: AddressData2[x] })
		if(AddressData3[x] && AddressData3[x].length > 11)
			console.log({type: type[2], tags : allTags[2], address: AddressData3[x]	})
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
			console.log({type: type[5], tags : allTags[5], address: AddressData6[x] })
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
