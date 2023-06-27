const bdMap = document.getElementById("Map")
const popup = document.querySelector(".popup")
const popupBody = document.querySelector(".popup-container")
const container = document.querySelector(".container")
const faq = document.querySelector(".faq")
let selectedPart = null

bdMap.addEventListener("click",(e)=>{
    const q = e.target.id;
    const part = document.getElementById(q);
    
    // If a part is already selected, restore its default color
    if (selectedPart) {
        selectedPart.style.fill = "";
    }
    
    // Set the clicked part to red
    part.style.fill = "red";
    
    // Update the selectedPart variable
    selectedPart = part;
    const url = `https://wiki-briefs.p.rapidapi.com/search?q=${q}&topk=5`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '17b753cb78msh6eb36def9a092d4p1bd087jsnbfb656273e2a',
            'X-RapidAPI-Host': 'wiki-briefs.p.rapidapi.com'
        }
    };

    const run = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            const modifyResult = JSON.parse(result)

            if(modifyResult.image === undefined || modifyResult.map === undefined){
                popupBody.innerHTML = `
                <button class="close">close</button>
                <h2>image not found</h2>
                <h1>${modifyResult.title}</h1>
                <p>${modifyResult.summary[0]}</p>
                <p>${modifyResult.summary[1]}</p>
                <a href="${modifyResult.url}" class="link" target="_blank">Read More</a>
                `
            }else{
                // DOM
                popupBody.innerHTML = `
                <button class="close">close</button>
                <img src = "${modifyResult.image}"></img>
                <h1>${modifyResult.title}</h1>
                <p>${modifyResult.summary[0]}</p>
                <p>${modifyResult.summary[1]}</p>
                <a href="${modifyResult.url}" class="link" target="_blank">Read More</a>
                <a href="${modifyResult.map}" target="_blank">Watch on google map</a>
                `
            }

            
            const btn = document.querySelector(".close")
            popup.classList.add("show")
            faq.classList.add("show")
            container.classList.add("show")
            btn.addEventListener("click",()=>{
                popup.classList.remove("show")
                container.classList.remove("show")
                faq.classList.remove("show")
            })
            console.log(modifyResult);
            console.log(modifyResult.image)
        } catch (error) {
            console.error(error);
        }
    }
    run()
})

