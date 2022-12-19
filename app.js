
Search = () => {
    word = document.getElementById("srchtxt").value;
    if (word.length == 0) {
        document.getElementById("error").innerHTML = "enter value"
    }
    else {

        if (Number.isInteger(parseInt(word))) {
            document.getElementById("error").innerHTML = "Sorry! only string"
        }
        else {
            let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            fetch(url).then(data => data.json()).then(data => showdata(data));
        }
    }
}

let myarray = [];
let synonymsdata = [];
let antonymsdata = [];
let definations = [];
showdata = (data) => {
    synonymsdata=[];
    antonymsdata = [];
    definations=[];
    word = document.getElementById("srchtxt").value="";
    myarray = data[0];
    let meanings = myarray.meanings[0];
    for (const key in meanings) {
        const element = meanings[key];
        if (typeof element === 'object') {
            if (key == "definitions") {
                for (const iterator of element) {
                    for (const key in iterator) {
                        let element = iterator[key];
                        if (typeof element === "string") {
                            element = (element.replace(/\(/g, ""));
                            element = (element.replace(/\)/g, ""));
                            definations.push(element);

                        }

                    }
                }
            }

            if (key == "synonyms") {
                for (const i of element) {
                    synonymsdata.push(i);
                    // console.log(synonymsdata);

                }
            }
            if (key == "antonyms") {
                for (const a of element) {
                    antonymsdata.push(a);
                    // console.log(antonymsdata);
                }
            }
        }
        else {
            document.getElementById("speechtype").innerHTML = element;
        }

    }
    displaydata();


}

displaydata = () => {
    document.getElementById('synonum').innerHTML ="";
    document.getElementById('antonyms').innerHTML ="";
    document.getElementById('definations').innerHTML ="";
  
    let syn = synonymsdata.map((elements) => {
        return elements;
    });

    document.getElementById('synonum').innerHTML = syn.join(",");

    document.getElementById("antonyms").innerHTML = antonymsdata.map((elements) => {
        return elements;
    }).join(",")
    document.getElementById("definations").innerHTML = definations.map((elements) => {
        return elements;
    }).join(",");

}




