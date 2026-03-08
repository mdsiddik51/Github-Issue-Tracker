
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

    issues.forEach(element => {
        console.log(element);
        // creat a dive 

        const creatCard = document.createElement('div');


        creatCard.innerHTML = `
            <section class="bg-[#FFFFFF] shadow-md rounded-md h-full">
                <article class=" border-t-6 rounded-3xl border-t-green-500 space-y-4 ">

                    <article class="p-4 space-y-4">
                        <!-- header status and buton -->
                        <div class="flex justify-between">
                            <div>
                                <img src="./assets/Open-Status.png" alt="">
                                <img class="hidden" src="./assets/Closed- Status .png" alt="">
                            </div>
                            <button class="bg-[#EF444470] text-[#EF4444] px-6 rounded-full">${element.priority}</button>
                        </div>


                        <!-- body and title  -->
                        <div class="pt-3 space-y-4">
                            <h1 class="font-semibold">${element.title}</h1>
                            <p class="text-[#64748B]">${element.description}</p>
                            <div class="mt-6">
                                <span class="bg-[#EF444470] px-1 py-1 rounded-full text-[#EF4444] text-center"><i
                                        class="fa-brands fa-android"></i>${element.labels[0]}</span>
                                <span class="px-1 py-1 bg-[#FDE68A70] text-[#D97706] rounded-full"><i
                                        class="fa-solid fa-circle-radiation"></i>${element.labels[1]}</span>
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
