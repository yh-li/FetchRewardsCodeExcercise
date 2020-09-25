/**
 * 
 * @param {*} word the input string that is going to be checked
 * This function checks if the input String, word, is composed of alphabet characters only
 */
function allLetter(word){
    //only contains character A-Z and a-z
    var letters = /^[A-Za-z]+$/;
    if(word.match(letters)){
        return true;
    }else{
        
        return false;
    }
    
}

/**
 * 
 * @param {*} word the input string that is going to be checked.
 * Precondition: word only contains alphabet characters
 * This function checks if the input string, word, is a pyramid word. It returns whether the 
 * word is a pyramid word and a message explaining the results
 */
function isPyramid(word){
    //stores the frequency of each character
    var counts = {};
    for(var i=0;i<word.length;i++){
        if(word.charAt(i).charCodeAt(0)-'a'.charCodeAt(0)>=0 && 
        word.charAt(i).charCodeAt(0)-'a'.charCodeAt(0)<=26){
            if(word.charAt(i) in counts){
                counts[word.charAt(i)]++;
            }else{
                counts[word.charAt(i)]=1;
            }
            
        }else{
            if(String.fromCharCode(word.charAt(i).charCodeAt(0)-'A'.charCodeAt(0)+'a'.charCodeAt(0)) in counts){
                counts[String.fromCharCode(word.charAt(i).charCodeAt(0)-'A'.charCodeAt(0)+'a'.charCodeAt(0))]++;
            }else{
                counts[String.fromCharCode(word.charAt(i).charCodeAt(0)-'A'.charCodeAt(0)+'a'.charCodeAt(0))]=1;
            }
        }
    }
    //sort by value
    var charCounts = [];
    for(var char in counts){
        charCounts.push([char,counts[char]]);
    }
    charCounts.sort(function compare(kv1,kv2){
        return kv1[1] - kv2[1];
    });
    //build a string containing all the counts of the chars
    var ispyramid = true;
    let s = word+" contains";
    for(var i=0;i<charCounts.length-1;i++){
        if(charCounts[i][1]!=i+1){
            ispyramid = false;
        }
        s = s + " "+charCounts[i][1]+" '"+charCounts[i][0]+"'";
        if(charCounts[i][1]>1){
            s = s+'s';
        }
        s = s+',';
    }
    if(charCounts.length==2){
        //if there are only two characters in the word
        //remove the extra comma
        s=s.slice(0,-1);
    }
    if(charCounts.length>1){
        s = s+" and";
    }
    
    s = s + " "+charCounts[charCounts.length-1][1]+" '"+charCounts[charCounts.length-1][0]+"'";
    if(charCounts[charCounts.length-1][1]>1){
        s = s+'s';
    }
    if(charCounts[charCounts.length-1][1]!=charCounts.length){
        ispyramid = false;
    }
    return [ispyramid,s];
}

/**
 * 
 * @param {*} word 
 * Checks if the word is composed of alphabet characters only first.
 * If so, check if it is a pyramid word.
 * If not, print the error message
 */
function check(word){
    document.getElementById("result").textContent = '';
    document.getElementById("errormsg").textContent = '';
    if(allLetter(word)){
        var ispyramid = isPyramid(word);
        var msg = ispyramid[1];
        if(ispyramid[0]){
            msg = msg +". So it is a pyramid word.";
        }else{
            msg = msg +". So it is not a pyramid word.";
        }
        document.getElementById("result").textContent = msg;
    }else{
        let msg = "Please make sure that the input is a non-empty string only containing alphabet chracters (A-Z or a-z)"
        document.getElementById("errormsg").textContent = msg;
    }
}
