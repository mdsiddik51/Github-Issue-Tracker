let curentTab = 'all-button';
const tabAcrive = ["bg-[#4A00FF]", "text-white"];
const tabinActive = ["bg-transparent", "text-black"];


//all card contaner
const cardContainer = document.getElementById('all-cards');
const openContainer = document.getElementById('open-cards');
const closedContainer = document.getElementById('closed-card');

// status update 

const allstatus = document.getElementById('status-counter');



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

            <div class="flex pt-2 gap-3 items-center text-[#64748B]">

                <span class="py-1 px-2 bg-[#00A96E] text-white rounded-full">${card.status}</span>

                <small>• Opened by ${card.assignee}</small>
                <small>• ${card.updatedAt.split("T")[0]}</small>

            </div>

            <div class="mt-6">
                                <span class="bg-[#EF444470] text-[12px] px-3 py-1 rounded-full text-[#EF4444] text-center"><i
                                        class="fa-brands fa-android"></i>${card.labels[0]}</span>
                                ${card.labels[1] !== undefined ? `<span class="px-3 py-1 text-[12px] bg-[#FDE68A70] text-[#D97706] rounded-full"><i class="fa-solid fa-circle-radiation"></i> ${card.labels[1]}</span>` : ""}
                </div>

            <div class="mt-4">
                <p class="text-[#64748B]">${card.description}</p>
            </div>

            <div class="flex justify-between p-3 mt-6 bg-[#F8FAFC] shadow-md rounded-md">
                
                <div class="grid grid-cols-1 space-y-2">
                    <span class="text-[#64748B]">Assignee:</span>
                    <span class="font-bold">${card.assignee}</span>
                </div>

                <div class="grid grid-cols-1 space-y-2">
                    <span class="text-[#64748B]">Priority:</span>
                    <span class="py-1 px-3 text-white bg-[#EF4444] rounded-full">${card.priority}</span>
                </div>

            </div>

        </div>
    `;

    document.getElementById('my_modal_5').showModal();
}


//   all api 

const allApi = () => {
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
            <section class="bg-[#FFFFFF] shadow-md rounded-md h-full">
                <article class=" border-t-6 rounded-3xl ${element.status === 'open'? "border-t-green-500" :"border-t-[#A855F7]"} space-y-4 ">

                    <article class="p-4 space-y-4">
                        <!-- header status and buton -->
                        <div class="flex justify-between">
                            <div>
                                ${element.status === 'open' ? `<img src="./assets/Open-Status.png" alt="">`:` <img src="./assets/Closed- Status .png" alt="">`}

                            </div>
                            <button onclick="lodedetels(${element.id})"  class="${element.priority === "high" ? "bg-[#EF444470] text-[#EF4444]" : element.priority === "medium" ? "bg-[#FDE68A70] text-[#D97706]": "bg-[#E5E7EB] text-[#374151]"} px-6 rounded-full">${element.priority}</button>
                        </div>


                        <!-- body and title  -->
                        <div class="pt-3 space-y-4">
                            <h1 class="font-semibold">${element.title}</h1>
                            <p class="text-[#64748B]">${element.description}</p>
                            <div class="mt-6">
                                <span class="bg-[#EF444470] text-[12px] px-3 py-1 rounded-full text-[#EF4444] text-center"><i
                                        class="fa-brands fa-android"></i>${element.labels[0]}</span>
                                ${element.labels[1] !== undefined ? `<span class="px-3 py-1 text-[12px] bg-[#FDE68A70] text-[#D97706] rounded-full"><i class="fa-solid fa-circle-radiation"></i> ${element.labels[1]}</span>` : ""}
                            </div>
                        </div>

                    </article>

                    <!-- horizontal divider  -->

                    <hr>

                    <div class="text-[#64748B] p-4 space-y-4">
                    <div class="flex justify-between">
                        <p>#1 by <span>${element.author}</span></p>
                        <div>
                            <span>${element.createdAt.split("T")[0]}</span>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <p>${element.assignee}</p>
                        <div>
                            <span>${element.updatedAt.split("T")[0]}</span>
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
        allstatus.innerText = allCard.children.length;

    });
}


allApi();

                        // search function
document.getElementById("search-btn").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

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
        });
});