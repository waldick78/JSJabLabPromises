var isUserFound = false;
var h4Count = 0;
let el = document.getElementById("nameFilter");
el.addEventListener("change", (item)=>{
	let textFieldContent = item.target.value;
	console.log(textFieldContent);
	let currentUser = {};
	$.get('http://jsonplaceholder.typicode.com/users', function(response){
		for (let i = 0; i < response.length; i++) {
			if (response[i].username === textFieldContent) {
				currentUser = response[i];
				let userEl = document.createElement("h1");
				userEl.innerHTML = response[i].name;
				userEl.classList.add("userElement");
				let assignEl = document.getElementById("messages");
				assignEl.appendChild(userEl);
				isUserFound = true;


				//create extra headers
				let h3ElPost = document.createElement("h3");
				h3ElPost.innerHTML = "Posts:";
				let assignH3Post = document.getElementById("messages");
				assignH3Post.appendChild(h3ElPost);

				let h3ElAlbum = document.createElement("h3");
				h3ElAlbum.innerHTML = "Albums:";
				let assignH3Album = document.getElementById("userPosts");
				assignH3Album.appendChild(h3ElAlbum);

				//remove the invalid message if any
				let elInvalid = document.getElementsByClassName("userInvElement");
				if (elInvalid.length > 0) {
					for(let invEl=0; invEl<elInvalid.length; invEl++) {
						elInvalid[invEl].remove();
					}
					h4Count = 0;
				}
				break;
			}
		}
		if (isUserFound === false && h4Count === 0) {
			let userEl = document.createElement("h4");
			userEl.innerHTML = "Please input a valid username!";
			let assignEl = document.getElementById("messages");
			assignEl.appendChild(userEl);
			userEl.classList.add("userInvElement");
			h4Count++;
		} 

		//for posts
		$.get('http://jsonplaceholder.typicode.com/posts', function(postByUser){
			postByUser.forEach((postObj) => {
				if (currentUser.id === postObj.userId){
			let newEl = document.createElement("li");
	        newEl.innerHTML = postObj.title;                    
	        newEl.classList.add("userElement");
	        let el = document.getElementById("userList");
	        el.appendChild(newEl);
	    }
	    })
		});


        //for albums
        $.get('http://jsonplaceholder.typicode.com/albums', function(postByAlbum){
			postByAlbum.forEach((albumObj) => {
				if (currentUser.id === albumObj.userId){
			let albumEl = document.createElement("li");
	        albumEl.innerHTML = albumObj.title;                    
	        albumEl.classList.add("userElement");
	        let elAlbum = document.getElementById("albumList");
	        elAlbum.appendChild(albumEl);
	    }
			});
		});
	})	
});


	
