
var uzyteKotki = [];
var stan = 1;
var pierwszyKotek;
var wynik = 0;

function zbudujPlansze(wysokosc, szerokosc){

    var domTable = document.querySelector('#plansza');
    var domTbody = document.createElement('tbody');
    
    var x, y;
    
    for(y=0; y<wysokosc; y++){
        var domTR = document.createElement('tr');
        
        for(x=0; x<szerokosc; x++){
            var domTD = document.createElement('td');
            var domTxt = document.createTextNode(x + 'x' + y);
            var kotekNr = 'kotki/'+(1+Math.floor(Math.random()*15))+'.jpg';

            var kotek = document.createElement('img');
           
            domTD.addEventListener('click', function(ev) {
                wynik++;
                document.querySelector('#wynik').innerHTML = wynik;
                
                var kliknietyKoteczek = this.children[0];
                if (uzyteKotki.indexOf(kliknietyKoteczek.src)>-1){  //chyba jest źle
                    return;
                }
                kliknietyKoteczek.style.visibility = 'visible';
                
                if(stan == 1){
                    pierwszyKotek = kliknietyKoteczek;    
                    stan = 2;
                }else{
                    if(pierwszyKotek.src == kliknietyKoteczek.src){
                        uzyteKotki.push(pierwszyKotek.src);
                        stan = 1;
                    }else{
                        setTimeout(function(){
                            pierwszyKotek.style.visibility = 'hidden';
                            kliknietyKoteczek.style.visibility = 'hidden';    
                        }, 750);
                    }
                    stan = 1;
                }
                if (uzyteKotki.length==4*4/2){
                    alert('Wygrałeś!');
                }
            });
            
            domTD.id = ('pos' + x + 'x' + y);
            
            domTD.appendChild(kotek);
            domTR.appendChild(domTD);
        }
        domTbody.appendChild(domTR);
    }
    domTable.appendChild(domTbody);
}


function losujKotki(){
    var uzyteKotki = [];   
    var kotekNr; 
    do{
            //losuje kotka
            do {
                kotekNr = (1+Math.floor(Math.random()*15));
            }while(uzyteKotki.indexOf(kotekNr) > -1); //jezeli zwroci inny element to jest w tablicy

            var x,y, domImg;
            
            //stawiam kotka na planszy pierwszy raz
            do{
                x = (Math.floor(Math.random()*4));
                y = (Math.floor(Math.random()*4));

                domImg = document.querySelector('td#pos' + x + 'x' + y + ' img');

            }while(domImg.src != '');
            domImg.src = 'kotki/' + kotekNr + '.jpg';

            //stawiam kotka na planszy drugi raz
            do{
                x = (Math.floor(Math.random()*4));
                y = (Math.floor(Math.random()*4));

                domImg = document.querySelector('td#pos' + x + 'x' + y + ' img');

            }while(domImg.src != '');
            domImg.src = 'kotki/' + kotekNr + '.jpg';
            
            //zuzywam kotka
            uzyteKotki.push(kotekNr);
    }while (uzyteKotki.length <4*4/2);
    
    console.log(domImg);
    console.log(kotekNr);
}

zbudujPlansze(4,4);
losujKotki();















