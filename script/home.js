let curentTab = 'all-button';
const tabAcrive = ["bg-[#4A00FF]", "text-white"];
const tabinActive = ["bg-transparent", "text-black"];


//all card contaner
const cardContainer = document.getElementById('all-cards');
const openContainer = document.getElementById('open-cards');
const closedContainer = document.getElementById('closed-card');

// status update 

const allstatus = document.getElementById('status-counter');

// manageSpinner

const spinner = (spin) => {
    if(spin == true){
        document.getElementById('spner').classList.remove('hidden');
        cardContainer.classList.add('hidden');
    }
    else{
        cardContainer.classList.remove('hidden');
        document.getElementById('spner').classList.add('hidden');
    }
}

const clickButton = (id) => {
    const tabs = ["all-button", "open-button", "closed-button"];
    for(const tab of tabs ){
        const tabid = document.getElementById(tab);
        if(tab === id){
            tabid.classList.remove(...tabinActive);
            tabid.classList.add(...tabAcrive);
        }
        else{
            tabid.classList.remove(...tabAcrive)
            tabid.classList.add(...tabinActive);
        }
    }

    const mainTag = [cardContainer, openContainer, closedContainer];

    for(const main of mainTag){
        main.classList.add('hidden');
    }
    if(id === 'all-button'){
        cardContainer.classList.remove('hidden');
        allstatus.innerText = cardContainer.children.length;
        
    }
    else if (id === 'open-button'){
        openContainer.classList.remove("hidden");
        allstatus.innerText = openContainer.children.length;
    }
    else{
        closedContainer.classList.remove("hidden");
        allstatus.innerText = closedContainer.children.length;
    }
 
}


clickButton(curentTab);



const lodedetels = async (id) => {
    const Url = ` https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const responce = await fetch(Url);
    const details = await responce.json();
    displayDetails(details.data);
}


const displayDetails = (card) => {
    const modal = document.getElementById('modal-container');
    modal.innerHTML = `
        <div class="p-4">

            <h1 class="font-bold text-2xl">${card.title}</h1>

            <div class="flex text-center pt-2 gap-3 items-center text-[#64748B]">

                <span class="py-1 px-4  ${card.status === 'open'?" bg-[#00A96E] text-white" : "bg-[#A855F7] text-white " } rounded-full">${card.status}</span>

                <small>• Opened by ${card.assignee}</small>
                <small>• ${card.updatedAt.split("T")[0]}</small>

            </div>

            <div class="mt-6">
                                <span class=" text-[12px] px-3 py-1 rounded-full ${card.labels[0] === 'enhancement'? "bg-[#00A96E60] border-2 border-[#00A96E] text-[#00A96E]" :"bg-[#EF444470] border-2 border-[#EF444470] text-[#EF4444]"} text-center"> ${card.labels[0] === 'bug'? `<i class="fa-brands fa-android"></i> `: `<i class="fa-regular fa-star"></i>` } ${card.labels[0].toUpperCase()}</span>
                                ${card.labels[1] !== undefined ? `<span class="px-3 py-1 text-[12px] ${card.labels[1] === 'enhancement'? "bg-[#00A96E60] border-2 border-[#00A96E] text-[#00A96E]" :"bg-[#FDE68A70] border-2 border-[#FDE68A70] text-[#D97706]"}  rounded-full">${card.labels[1] === 'enhancement'? `<i class="fa-regular fa-star"></i> `: `<i class="fa-solid fa-circle-radiation"></i> `} ${card.labels[1].toUpperCase()}</span>` : ""}
                </div>

            <div class="mt-4">
                <p class="text-[#64748B]">${card.description}</p>
            </div>

            <div class="flex justify-between p-3 mt-6 bg-[#F8FAFC] shadow-md rounded-md">
                
                <div class="grid grid-cols-1 space-y-2">
                    <span class="text-[#64748B]">Assignee:</span>
                    <span class="font-bold">${card.assignee === ""? "No Name Found": card.assignee}</span>
                </div>

                <div class="grid grid-cols-1 space-y-2">
                    <span class="text-[#64748B]">Priority:</span>
                    <span class="py-1 px-4 t ${card.priority === "high" ? "bg-[#EF4444] text-white" : card.priority === "medium" ? "bg-[#FDE68A70] text-yellow-500": "bg-[#E5E7EB] text-black"} rounded-full">${card.priority}</span>
                </div>

            </div>

        </div>
    `;

    document.getElementById('my_modal_5').showModal();
}


//   all api 

const allApi = () => {
    spinner(true);
    const Url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(Url)
        .then(Response => Response.json())
        .then(data => displayIssye(data.data))
}

const displayIssye = (issues) => {
    const allCard = document.getElementById('all-cards');
    allCard.innerHTML = "";

    issues.forEach(element => {
        const creatCard = document.createElement('div');

        creatCard.innerHTML = `
            <section onclick="lodedetels(${element.id})"  class=" hover:scale-105 transition duration-400 bg-[#FFFFFF] shadow-md rounded-md h-full">
                <article  class=" border-t-6 rounded-3xl ${element.status === 'open'? "border-t-green-500" :"border-t-[#A855F7]"} space-y-4 ">

                    <article class="p-4 space-y-4">
                        <!-- header status and buton -->
                        <div class="flex justify-between">
                            <div>
                                ${element.status === 'open' ? `<img src="./assets/Open-Status.png" alt="">`:` <img src="./assets/Closed- Status .png" alt="">`}

                            </div>
                            <button  class="${element.priority === "high" ? "bg-[#EF444470] text-[#EF4444]" : element.priority === "medium" ? "bg-[#FDE68A70]  text-[#D97706]": "bg-[#E5E7EB]  text-[#374151]"} px-6 rounded-full">${element.priority}</button>
                        </div>


                        <!-- body and title  -->
                        <div class="pt-3 space-y-4">
                            <h1 class="font-semibold">${element.title}</h1>
                            <p class="text-[#64748B]">${element.description}</p>
                            <div class="mt-6 space-x-2">
                                <span class=" ${element.labels[0] === 'enhancement'? "bg-[#00A96E60] border-2 border-[#00A96E] text-[#00A96E]" :"bg-[#EF444470] border-2 border-[#EF444470] text-[#EF4444] "} text-[10px] px-3 py-1 rounded-full text-center"> ${element.labels[0] === 'bug'? `<i class="fa-brands fa-android"></i> `: `<i class="fa-regular fa-star"></i>` }  ${element.labels[0].toUpperCase()} </span>
                                ${element.labels[1] !== undefined ? `<span class="px-3 py-1 text-[10px] ${element.labels[1] === 'enhancement'? "bg-[#00A96E60] border-2 border-[#00A96E] text-[#00A96E]" :"bg-[#FDE68A70] border-2 border-[#FDE68A70] text-[#D97706]"} rounded-full"> ${element.labels[1] === 'enhancement'? `<i class="fa-regular fa-star"></i> `: `<i class="fa-solid fa-circle-radiation"></i> `} ${element.labels[1].toUpperCase()} </span>` : ""}
                            </div>
                        </div>

                    </article>

                    <!-- horizontal divider  -->

                    <hr>

                    <div class="text-[#64748B] p-4 space-y-4">
                    <div class="space-y-2">
                        <p>#1 by <span>${element.author}</span></p>
                        <div>
                            <span>${element.createdAt.split("T")[0]}</span>
                        </div>
                    </div>
                </div>



                </article>
            </section>
        `;

        if(element.status === 'open'){
           openContainer.append(creatCard.cloneNode(true));
        }
        else{
            closedContainer.append(creatCard.cloneNode(true));
        }

        allCard.append(creatCard);

        spinner(false);

        allstatus.innerText = allCard.children.length;

        clickButton(curentTab);

    });
}


allApi();

const input = document.getElementById("input-search");

input.addEventListener("input", () => {
    search_fun();
});

// search function
const search_fun = () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    if (!searchValue) return;

    spinner(true);

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const issues = data.data;

            const filteredIssues = issues.filter(issue => 
                issue.title.toLowerCase().includes(searchValue) ||
                issue.description.toLowerCase().includes(searchValue)
            );

            displayIssye(filteredIssues);
            spinner(false);
        });
};
search_fun()