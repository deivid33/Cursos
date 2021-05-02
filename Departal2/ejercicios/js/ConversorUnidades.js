function miFuncionLongitud(val1,val2,val3){
    var display = document.getElementById("input_longitud_2");
    var res1;
    if(val1 == val2) input_longitud_2.value = val3;
    else{
        switch(val2)
        {   case "1" :
            res1 = 100000*val3;
            break;
            case "2" :
            res1 = 100*val3;
            break;
            case "3" :
            res1 = val3;
            break;
            case "4" :
            res1 = 0.1*val3;
            break;
            case "5" :
            res1 = 0.0001*val3;
            break;
            case "6" :
            res1 = 0.0000001*val3;
            break;
            case "7" :
            res1 = 160934*val3;
            break;
            case "8" :
            res1 = 91.44*val3;
            break;
            case "9" :
            res1 = 30.48*val3;
            break;
            case "10" :
            res1 = 2.54*val3;
            break;
            case "11" :
            res1 = 185200*val3;
            break;
        }
        switch(val1)
        {   case "1" :
            input_longitud_2.value = res1/100000;
            break;
            case "2" :
            input_longitud_2.value = res1/100;
            break;
            case "3" :
            input_longitud_2.value = res1;
            break;
            case "4" :
            input_longitud_2.value = res1/0.1;
            break;
            case "5" :
            input_longitud_2.value = res1/0.0001;
            break;
            case "6" :
            input_longitud_2.value = res1/0.0000001;
            break;
            case "7" :
            input_longitud_2.value = res1/160934;
            break;
            case "8" :
            input_longitud_2.value = res1/91.44;
            break;
            case "9" :
            input_longitud_2.value = res1/30.48;
            break;
            case "10" :
            input_longitud_2.value = res1/2.54;
            break;
            case "11" :
            input_longitud_2.value = res1/185200;
            break;
        }
    }
}
function miFuncionTemperatura(val1,val2,val3){
    var display = document.getElementById("input_temperatura_2");
    var res1;
    if(val1 == val2) input_temperatura_2.value = val3;
    else{
        switch(val2){
            case "1" :
            res1 = val3;
            break;
            case "2" :
            res1 = val3 - 273.15;
            break;
            case "3" :
            res1 = ((val3 - 32)*5)/9;
            break;
        }
        switch(val1){
            case "1" :
            input_temperatura_2.value = res1;
            break;
            case "2" :
            input_temperatura_2.value = res1 + 273.15;
            break;
            case "3" :
            input_temperatura_2.value = ((res1*9)/5)+32;
            break;
        }
    }
}
function miFuncionMasa(val1,val2,val3){
    var display = document.getElementById("input_masa_2");
    var res1;
    if(val1 == val2) input_masa_2.value = val3;
    else{
        switch(val2){
            case "1" :
            res1 = 1000000*val3;
            break;
            case "2" :
            res1 = 1000*val3;
            break;
            case "3" :
            res1 = val3;
            break;
            case "4" :
            res1 = 0.001*val3;
            break;
            case "5" :
            res1 = 0.000001*val3;
            break;
            case "6" :
            res1 = 1000600*val3;
            break;
            case "7" :
            res1 = 907185*val3;
            break;
            case "8" :
            res1 = 6350.29*val3;
            break;
            case "9" :
            res1 = 453.592*val3;
            break;
            case "10" :
            res1 = 28.3495*val3;
            break;
        }
        switch(val1){
            case "1" :
            input_masa_2.value = res1/1000000;
            break;
            case "2" :
            input_masa_2.value = res1/1000;
            break;
            case "3" :
            input_masa_2.value = res1;
            break;
            case "4" :
            input_masa_2.value = res1/0.001;
            break;
            case "5" :
            input_masa_2.value = res1/0.000001;
            break;
            case "6" :
            input_masa_2.value = res1/1000600;
            break;
            case "7" :
            input_masa_2.value = res1/907185;
            break;
            case "8" :
            input_masa_2.value = res1/6350.29;
            break;
            case "9" :
            input_masa_2.value = res1/453.592;
            break;
            case "10" :
            input_masa_2.value = res1/28.3495;
            break;
        }
    }
}


