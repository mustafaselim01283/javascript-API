

class Details {

    photo;

    photoid=document.getElementById('id');
    img=document.getElementById('img');
    title=document.getElementById('title');

    constructor() {
    
        this.getdata(this.getid())
        
    }

    getdata(x) {

        let xml = new XMLHttpRequest()

        xml.open('get', `https://jsonplaceholder.typicode.com/photos/${x}`)
        xml.send()

        xml.onload = ()=> {
            if (xml.status === 200) {
                this.photo = JSON.parse(xml.responseText)
                console.log(this.photo);
                this.fillDatat()
            }
            
        }

    }
    getid() {
        let url = location.href

        let id = url.split('?')[1]

        return id

    }

    backToHome() {
        
            window.location.replace(`index.html?`)
    }

    fillDatat(){
        
    this.photoid.setAttribute('value',`${this.photo.id}`)
     
    this.img.setAttribute('value',`${this.photo.url}`)
     
    this.title.setAttribute('value',`${this.photo.title}`)
    }

    sendData(){
        let newItem={
            url:this.img.value,
            id:this.photoid.value,
            title:this.title.value 
        }
        
        if(!this.img.value||!this.photoid.value||!this.title.value){
           alert("please fill all the inputs")
        }
        else{
            let xml = new XMLHttpRequest()

            xml.open('PUT', `https://jsonplaceholder.typicode.com/photos/${this.photo.id}`)
            xml.send()

            xml.onload=()=>{
                if (xml.status === 200) {
                   this.backToHome()
                   alert('updit success')
                }
            }
        }
    }

  

}


let cardDetails = new Details()
