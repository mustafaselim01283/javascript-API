

class HomeData {

  posts = [];

  url = `https://jsonplaceholder.typicode.com/photos`

  xml = new XMLHttpRequest()

  constructor() {

    if (this.posts.length == 0) {
      this.xml.open('get', this.url)
      this.xml.send()

      this.xml.onload = () => {
        if (this.xml.status === 200) {
          this.posts = [...JSON.parse(this.xml.responseText)].slice(100, 199)
          console.log(this.posts);
          this.creatPost()

        }

      }
    }

  }

  creatPost() {

    this.posts.map((i) => {
      document.querySelector('.row').innerHTML += `
<div id='${i.id}' class="col">
<div class="card h-100">
  <img src="${i.url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">${i.title}</p>
  </div>
  <div class="px-3 ">
  <button class="btn btn-info text-white mb-3 pointer px-4" onclick="home.changeLocation(${i.id})">Edit</button>
  <button class="btn btn-danger text-white ms-auto mb-3" onclick="home.deleteItem(${i.id})">Delete</button>
  </div>
</div>
</div>


`
    })
  }

  changeLocation(x) {

    window.location.replace(`index2.html?`+ x)

  }

  deleteItem(z) {
  let conferm= prompt('are you sure you want delete this item','yes')

  if(conferm=='yes'){
    let xml = new XMLHttpRequest()

    xml.open('DELETE', `https://jsonplaceholder.typicode.com/photos/${z}`)
    xml.send()

    xml.onload=()=>{
        if (xml.status === 200) {
          this.posts.map((i, index) => {
            if (i.id == z) {
              this.posts.splice(index, 1)
              document.getElementById(`${i.id}`).remove()
            }
          })
        }
    }
  }
  }

}



let home = new HomeData()

