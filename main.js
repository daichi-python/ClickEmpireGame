const config = {
    initialPage: document.getElementById("initialPage"),
    clickPage: document.getElementById("clickPage")
}

function displayNone(page){
    page.classList.remove("d-block");
    page.classList.add("d-none");
}

function displayBlock(page){
    page.classList.remove("d-none");
    page.classList.add("d-block");
}

const gameItems = {
    "flipMachine": {
        name: "Flip machine",
        price: 15000,
        count: 0,
        maxPurchases: 500,
        imgUrl: "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png",
        rate: 25,
        type: "click"
    },

    "etfStock": {
        name: "ETF Stock",
        price: 300000,
        count: 0,
        total: 0,
        maxPurchases: "∞",
        imgUrl: "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
        rate: 0.1,
        type: "multiplication"
    },

    "etfBonds": {
        name: "ETF Bonds",
        price: 300000,
        count: 0,
        total: 0,
        maxPurchases: "∞",
        imgUrl: "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
        rate: 0.07,
        type: "multiplication"
    },

    "lemonadeStand": {
        name: "Lemonade Stand",
        price: 30000,
        count: 0,
        maxPurchases: 1000,
        imgUrl: "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png",
        rate: 30,
        type: "addition"
    },

    "iceCreamTruck": {
        name: "Ice Cream Truck",
        price: 100000,
        count: 0,
        maxPurchases: 500,
        imgUrl: "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png",
        rate: 120,
        type: "addition"
    },

    "house": {
        name: "House",
        price: 20000000,
        count: 0,
        maxPurchases: 100,
        imgUrl: "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png",
        rate: 32000,
        type: "addition"
    },

    "townHouse": {
        name: "TownHouse",
        price: 40000000,
        count: 0,
        maxPurchases: 100,
        imgUrl: "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png",
        rate: 64000,
        type: "addition"
    },

    "mansion": {
        name: "Mansion",
        price: 250000000,
        count: 0,
        maxPurchases: 20,
        imgUrl: "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png",
        rate: 500000,
        type: "addition"
    },

    "industrialSpace": {
        name: "Industrial",
        price: 1000000000,
        count: 0,
        maxPurchases: 10,
        imgUrl: "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png",
        rate: 2200000,
        type: "addition"
    },

    "hotelSkyscraper": {
        name: "Hotel Skyscraper",
        price: 10000000000,
        count: 0,
        maxPurchases: 5,
        imgUrl: "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png",
        rate: 25000000,
        type: "addition"
    },

    "bulletSpeedSkyRailway": {
        name: "Bullet-Speed Sky Railway",
        price: 10000000000000,
        count: 0,
        maxPurchases: 1,
        imgUrl: "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png",
        rate: 30000000000,
        type: "addition"
    }
}

const itemNames = [
    "flipMachine", "etfStock", "etfBonds", "lemonadeStand",
    "iceCreamTruck", "house", "townHouse", "mansion", 
    "industrialSpace", "hotelSkyscraper", "bulletSpeedSkyRailway"
]

class GameData{
    constructor(name, days, money, click, items){
        this.name = name;
        this.days = days;
        this.money = money;
        this.click = click;
        this.items = items;
    }
}

class UserAccounts{
    constructor(name, days=0, money=50000, click=0, items=gameItems){
        this.name = name;
        this.days = days;
        this.money = money;
        this.click = click;
        this.items = items;
    }

    oneClickPrice(){
        let flipMachine = this.items["flipMachine"];
        return (flipMachine.count + 1) * 25;
    }

    clickHamburger(){
        this.click += 1;
        this.money += this.oneClickPrice();
    }

    getYear(){
        return Math.floor(this.days / 365) + 20;
    }

    getPriceString(menuItem){
        if(menuItem.type === "click"){
            return `¥${menuItem.rate} /click`;
        }else{
            return `¥${menuItem.rate} /sec`
        }
    }

    purchaseItem(menuItem, count){
        let item = this.items[menuItem];
        let totalPrice = 0;
        if(menuItem === "etfStock"){
            for(let i = 0; i < count; i++){
                totalPrice += item.price * Math.pow(item.rate, i);
            }
        }else{
            totalPrice = item.price * count;
        }

        if(this.money < totalPrice) return null;
        
        item.count += count;
        this.money -= totalPrice;
        document.getElementById("money").innerHTML = `¥${this.money}`;

        if(menuItem === "flipMachine"){
            document.getElementById("click-price").innerHTML = `one click ¥ ${this.oneClickPrice()}`;
        } else if(item.type === "multiplication"){
            item.total += totalPrice;
        }

        if(menuItem === "etfStock"){
            item.price = Math.floor(item.price * Math.pow((1 + item.rate), count));
        }
    }
}

function initializeUserAccount(){
    const name = document.getElementById("name-input").value;
    if (name === "") {
        alert("Please put your name");
    } else {
        let user = new UserAccounts(name);
        displayNone(config.initialPage);
        displayBlock(config.clickPage);
        config.clickPage.append(hamburgerClickPage(user));
    }
}

function loginUserAccount(){
    const name = document.getElementById("name-input").value;
    if (name === ""){
        alert("Please put your name");
    } else {
        let user = jsonLoad(name);
        console.log(user);
        if(user === null) alert("There is no data.");
        else{
            displayNone(config.initialPage);
            displayBlock(config.clickPage);
            config.clickPage.append(hamburgerClickPage(user));
        }
    }
}

function displayUpdate(UserAccount){
    const clickCount = document.getElementById("click-count");
    clickCount.innerHTML = `${UserAccount.click} Burgers`;

    const clickPrice = document.getElementById("click-price");
    clickPrice.innerHTML = `one click ¥ ${UserAccount.oneClickPrice()}`;

    const money = document.getElementById("money");
    money.innerHTML = `¥${UserAccount.money}`;
}

function hamburgerClickPage(UserAccount){
    const container = document.createElement("div");

    const topPage = document.createElement("div");
    topPage.classList.add("d-flex", "justify-content-center");
    topPage.innerHTML = 
    `
    <div class="bg-navy col-10 text-white">
        <div class="col-12 p-3 row">
            <div class="col-4 p-1">
                <div class="bg-dark text-center p-1">
                    <div class="w-100 bg-navy">
                        <p id="click-count" class="click-count m-0">${UserAccount.click} Burgers</p>
                        <p id="click-price" class="click-price m-0">one click ¥ ${UserAccount.oneClickPrice()}</p>
                    </div>
                    <div class="p-3">
                        <img id="hamburger" class="w-75 burger" src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png">
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="col-12 bg-dark my-2 p-1 text-center">
                    <div class="d-flex justify-content-around col-12 mb-1">
                        <div class="w-50 bg-navy mr-2">
                            <p>${UserAccount.name}</p>
                        </div>
                        <div class="w-50 bg-navy">
                            <p id="year">${UserAccount.getYear()} years old</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around col-12 mt-1 mb-0">
                        <div class="w-50 bg-navy mr-2">
                            <p id="days">${UserAccount.days} days</p>
                        </div>
                        <div class="w-50 bg-navy">
                            <p id="money">¥${UserAccount.money}</p>
                        </div>
                    </div>
                </div>
                <div id="menu-container" class="col-12 bg-dark mt-2 p-2">
                </div>
                <div id="data-manage" class="col-12"></div>
            </div>
        </div>
    </div>
    `
    container.append(topPage);

    const hamburger = container.querySelectorAll("#hamburger")[0];
    hamburger.addEventListener("click", () => {
        UserAccount.clickHamburger();
        const clickCount = container.querySelectorAll(".click-count")[0];
        clickCount.innerHTML = `${UserAccount.click} Burgers`;

        const money = container.querySelectorAll("#money")[0];
        money.innerHTML = `¥${UserAccount.money}`;
    })

    let timer = setInterval(function(){
        incrementMoney(UserAccount);

        UserAccount.days += 1;
        const days = document.getElementById("days");
        days.innerHTML = `${UserAccount.days} days`;

        const year = document.getElementById("year");
        year.innerHTML = `${UserAccount.getYear()} years old`;

        const money = document.getElementById("money");
        money.innerHTML = `¥${UserAccount.money}`;
    }, 1000);

    const menuCon = container.querySelectorAll("#menu-container")[0];
    menuCon.append(scrollPage(UserAccount));

    const dataManage = container.querySelectorAll("#data-manage")[0];
    dataManage.innerHTML = 
    `
    <div class="d-flex justify-content-end align-items-center mt-2">
        <div class="reset json mx-2 btn border-light">
            <i class="fas fa-undo fa-2x text-white"></i>
        </div>
        <div class="save mx-2 btn border-light">
            <i class="json fas fa-save fa-2x text-white"></i>
        </div>
    </div>
    `;

    const reset = dataManage.querySelectorAll(".reset")[0];
    reset.addEventListener("click", () => {
        let yorn = window.confirm("Reset All Data?")
        if(yorn){
            resetGame(UserAccount);
            clearInterval(timer);
            let user = new UserAccounts(UserAccount.name);
            config.clickPage.innerHTML = "";
            config.clickPage.append(hamburgerClickPage(user));
        }
    })

    const save = dataManage.querySelectorAll(".save")[0];
    save.addEventListener("click", () => {
        saveGame(UserAccount);
        alert("Saved your data. Please put the same name when you login.");
        window.location.reload();
    })

    return container
}

function scrollPage(UserAccount){
    const container = document.createElement("div");

    const menuCon = document.createElement("div");
    menuCon.classList.add("scroll")
    for(let item of itemNames){
        menuCon.innerHTML += 
        `
        <div class="menu d-flex justify-content-between bg-navy mb-1" data-name="${item}">
            <div class="row w-75 py-2 ml-2">
                <div class="col-4">
                    <img class="w-100" src="${UserAccount.items[item].imgUrl}">
                </div>
                <div class="col-8 d-flex align-items-center">
                    <div>
                        <h3>${UserAccount.items[item].name}</h3>
                        <p>¥${UserAccount.items[item].price}</p>
                    </div>
                </div>
            </div>
            <div class="w-25 d-flex align-items-center justify-content-end">
                <div class="mr-3 text-right">
                    <h2>${UserAccount.items[item].count}</h2>
                    <p class="text-success">${UserAccount.getPriceString(UserAccount.items[item])}</p>
                </div>
            </div>
        </div>
        `
    }

    let menus = menuCon.querySelectorAll(".menu");
    for(let menu of menus){
        menu.addEventListener("click", () => {
            const menuAttr = menu.getAttribute("data-name");
            container.innerHTML = "";
            container.append(menuDetailPage(UserAccount.items[menuAttr], UserAccount));

            const backBtn = container.querySelectorAll(".back-btn")[0];
            backBtn.addEventListener("click", () => {
                container.innerHTML = "";
                container.append(menuCon);
            })

            const nextBtn = container.querySelectorAll(".next-btn")[0];
            nextBtn.addEventListener("click", () => {
                const formValue = parseInt(container.querySelectorAll(".form-control")[0].value);

                if(formValue < 0){
                    alert("Invalid number");
                }else if(UserAccount.items[menuAttr].maxPurchases !== "∞" && UserAccount.items[menuAttr].maxPurchases < UserAccount.items[menuAttr].count + formValue ){
                    alert("You can't buy anymore.");
                }else{
                    const resp = UserAccount.purchaseItem(menuAttr, formValue);
                    if (resp === null) alert("You don't have enough money.");   
                }
                container.innerHTML = "";
                container.append(scrollPage(UserAccount));
                displayUpdate(UserAccount);
            })
        })
    }
    
    container.append(menuCon);
    return container
}

function menuDetailPage(menuItem, UserAccount){
    const container = document.createElement("div");
    container.innerHTML = 
    `
    <div id="detailCon" class="bg-navy p-2 mx-1">
        <div class="row">
            <div class="col-7 align-self-center">
                <h2>${menuItem.name}</h2>
                <p>Max purchases: ${menuItem.maxPurchases}</p>
                <p>Price: ¥${menuItem.price}</p>
                <p>Get ${UserAccount.getPriceString(menuItem)}</p>
            </div>
            <div class="col-5 align-self-center">
                <img class="w-100" src="${menuItem.imgUrl}">
            </div>
        </div>
        <div>
            <form>
                <label>How many would you like to buy?</label>
                <input type="number" placeholder="0" class="col-12 form-control">
                <p class="total text-right mt-0">total: ¥0</p>
            </form>
        </div>
    </div>
    `;

    const form = container.querySelectorAll(".form-control")[0];
    form.addEventListener("change", () => {
        const total = container.querySelectorAll(".total")[0];

        if(parseInt(form.value) >= 0 && menuItem.name === "ETF Stock"){
            let totalPrice = 0;
            for(let i = 0; i < parseInt(form.value); i++){
                totalPrice += Math.floor(menuItem.price * Math.pow((1 + menuItem.rate), i));
            }
            total.innerHTML = `total: ¥${totalPrice}`
        }else if(parseInt(form.value) >= 0){
            total.innerHTML = `total: ¥${parseInt(form.value) * menuItem.price}`;
        }
    })

    const detailCon = container.querySelectorAll("#detailCon")[0];
    detailCon.append(backNextBtn("Go Back", "Purchase"));

    return container;
}

function backNextBtn(back, next){
    const container = document.createElement("div");
    container.innerHTML = 
    `
    <div class="row justify-content-between mb-3">
        <div class="col-5">
            <button class="btn btn-light text-primary w-100 back-btn">${back}</button>
        </div>
        <div class="col-5">
            <button class="btn btn-primary w-100 next-btn">${next}</button>
        </div>
    </div>
    `
    return container
}

function incrementMoney(UserAccount){
    let oneTimeMoney = 0;
    for(let menu of itemNames){
        let item = UserAccount.items[menu];
        if(item.type === "click") continue;
        else if(item.type === "multiplication") oneTimeMoney += item.total * item.rate;
        else oneTimeMoney += item.rate * item.count;
    }
    UserAccount.money += Math.floor(oneTimeMoney);
}

function jsonLoad(name){
    let mydata = localStorage.getItem(name);
    if(mydata === null) return null;

    let gameData = JSON.parse(mydata);
    let user = new UserAccounts(
        name=gameData.name,
        days=gameData.days,
        money=gameData.money,
        click=gameData.click,
        items=gameData.items
    );
    return user;
}

function resetGame(UserAccount){
    localStorage.removeItem(UserAccount.name);
}

function saveGame(UserAccount){
    let gameData = new GameData(
        UserAccount.name, UserAccount.days, UserAccount.money, UserAccount.click, UserAccount.items
    );
    
    let jsonEncoded = JSON.stringify(gameData);
    localStorage.setItem(gameData.name, jsonEncoded);
}
