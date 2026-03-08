
const clickButton = (id) => {

    const allButtonTabs = ["all-button", "open-button", "closed-button"];

    for (const tab of allButtonTabs) {

        const button = document.getElementById(tab);

        if (tab === id) {
            button.classList.add("bg-[#4A00FF]", "text-white");
            allApi();
        }
        else {
            button.classList.remove("bg-[#4A00FF]", "text-white");
        }

    }
}



const lodedetels = async (id) => {
    const Url = ` https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const responce = await fetch(Url);
    const details = await responce.json();
    displayDetails(details.data);
}




/**
 * 
 * {
    "id": 1,
    "title": "Fix navigation menu on mobile devices",
    "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    "status": "open",
    "labels": [
        "bug",
        "help wanted"
    ],
    "priority": "high",
    "author": "john_doe",
    "assignee": "jane_smith",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
}
 */
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

            <div class="mt-6 flex gap-2">
                <span class="bg-[#EF444470] px-3 py-1 rounded-full text-[#EF4444]">
                    <i class="fa-brands fa-android"></i> ${card.labels[0]}</span>

                <span class="px-3 py-1 bg-[#FDE68A70] text-[#D97706] rounded-full">
                    <i class="fa-solid fa-circle-radiation"></i>${card.labels[1]}</span>
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


    /**{
   {
    "id": 1,
    "title": "Fix navigation menu on mobile devices",
    "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    "status": "open",
    "labels": [
        "bug",
        "help wanted"
    ],
    "priority": "high",
    "author": "john_doe",
    "assignee": "jane_smith",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
}
} */

    //onclick="my_modal_5.showModal()"
    issues.forEach(element => {
       
        // creat a div 

        const creatCard = document.createElement('div');


        creatCard.innerHTML = `
            <section class="bg-[#FFFFFF] shadow-md rounded-md h-full">
                <article class=" border-t-6 rounded-3xl ${element.priority === 'high' || element.priority === 'medium' ? "border-t-green-500" :"border-t-[#A855F7]"} space-y-4 ">

                    <article class="p-4 space-y-4">
                        <!-- header status and buton -->
                        <div class="flex justify-between">
                            <div>
                                <img src="./assets/Open-Status.png" alt="">
                                <img class="hidden" src="./assets/Closed- Status .png" alt="">
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

        allCard.append(creatCard)
    });


}


allApi();

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