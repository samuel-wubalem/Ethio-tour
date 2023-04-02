var $jqtH7$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/* eslint-disable */ 
/* eslint-disable */ const $3adf927435cf4518$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $3adf927435cf4518$export$de026b00723010c1 = (type, msg)=>{
    $3adf927435cf4518$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($3adf927435cf4518$export$516836c6a9dfc573, 5000);
};


const $3fffefddab1a405a$export$87d51fc9023e4534 = async (data, type)=>{
    try {
        const url = type === "password" ? "http://127.0.0.1:8000/api/v1/users/updatemypassword" : "http://127.0.0.1:8000/api/v1/users/updateMe";
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "PATCH",
            url: url,
            data: data
        });
        if (res.data.status === "success") (0, $3adf927435cf4518$export$de026b00723010c1)("success", `${type.toUpperCase()} updated successfully!`);
    } catch (error) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", err.response.data.message);
    }
};


/* eslint-disable*/ 
const $6710bca62beba915$var$stripe = Stripe("pk_test_51Mk4sRBFd9Mb1hZkR2t1Pz19Bv6pQD00KfxfZ1ntKVwNTWtIoOy0IN4qGufIC7hZpB1LVW96dUL3XRCt1XbAw4L400efjT9qzq");
const $6710bca62beba915$export$8d5bdbf26681c0c2 = async (tourId)=>{
    const session = await (0, ($parcel$interopDefault($jqtH7$axios)))(`http://127.0.0.1:8000/api/v1/bookings/checkout-sesssion/${tourId}`);
    await $6710bca62beba915$var$stripe.redirectToCheckout({
        sessionId: session.data.session.id
    });
};


/* eslint-disable */ 

const $70af9284e599e604$var$loginForm = document.querySelector(".formlog");
const $70af9284e599e604$var$logoutbtn = document.querySelector(".nav__el--logout");
if ($70af9284e599e604$var$loginForm) try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
        method: "POST",
        url: "http://127.0.0.1:8000/api/v1/users/login",
        data: {
            email: email,
            password: password
        }
    });
    if (res.data.status === "success") {
        (0, $3adf927435cf4518$export$de026b00723010c1)("success", "Logged in succussfuly");
        window.setTimeout(()=>{
            location.assign("/");
        }, 1500);
    }
} catch (err) {
    (0, $3adf927435cf4518$export$de026b00723010c1)("error", err.response.data.message);
}
if ($70af9284e599e604$var$logoutbtn) $70af9284e599e604$var$logoutbtn.addEventListener("click", async ()=>{
    try {
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "GET",
            url: "http://127.0.0.1:8000/api/v1/users/logout"
        });
        res.data.status = "success";
        location.reload(true);
    } catch (err) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", "Error logging out! Try again");
    }
});


/* eslint-disable*/ const $f60945d37f8e594c$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1Ijoic2FtdWVsd2ViYWxlbSIsImEiOiJjbGRrbjVjYnMwMzN0M3BycTBpdzhtcmJpIn0.chrSskLY82sls7ohRIuPSg";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/samuelwebalem/cldktrydk000001mwynibfg38",
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        const el = document.createElement("div");
        el.className = "marker";
        new mapboxgl.Marker({
            element: el,
            anchor: "bottom"
        }).setLngLat(loc.coordinates).addTo(map);
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>${loc.day} days: ${loc.description}</p>`).addTo(map);
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};


/* eslint-disable*/ 

const $2db3670f13ba185b$var$signinForm = document.querySelector(".formsign");
const $2db3670f13ba185b$export$7200a869094fec36 = async (email, password, name, passwordConfirm)=>{
    try {
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "POST",
            url: "http://127.0.0.1:8000/api/v1/users/signup",
            data: {
                email: email,
                password: password,
                name: name,
                passwordConfirm: passwordConfirm
            }
        });
        if (res.data.status === "success") {
            (0, $3adf927435cf4518$export$de026b00723010c1)("success", "Signed up succussfuly");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", err.response.data.message);
    }
};


const $d0f7ce18c37ad6f6$var$bookBtn = document.getElementById("book-tour");
const $d0f7ce18c37ad6f6$var$userDataForm = document.querySelector(".form-user-data");
const $d0f7ce18c37ad6f6$var$userPasswordForm = document.querySelector(".form-user-password");
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector(".formlog");
const $d0f7ce18c37ad6f6$var$logoutbtn = document.querySelector(".nav__el--logout");
const $d0f7ce18c37ad6f6$var$mapbox = document.getElementById("map");
const $d0f7ce18c37ad6f6$var$signinForm = document.querySelector(".formsign");
if ($d0f7ce18c37ad6f6$var$mapbox) {
    const locations = JSON.parse($d0f7ce18c37ad6f6$var$mapbox.dataset.locations);
    (0, $f60945d37f8e594c$export$4c5dd147b21b9176)(locations);
}
if ($d0f7ce18c37ad6f6$var$signinForm) $d0f7ce18c37ad6f6$var$signinForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const passwordConfirm = document.getElementById("passwordconfirm").value;
    (0, $2db3670f13ba185b$export$7200a869094fec36)(email, password, name, passwordConfirm);
});
// if (loginForm) {
//   loginForm.addEventListener('submit', async (e) => { 
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     login(email,password)
//   })
// }
if ($d0f7ce18c37ad6f6$var$userDataForm) $d0f7ce18c37ad6f6$var$userDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("email", document.getElementById("email").value);
    form.append("name", document.getElementById("name").value);
    form.append("photo", document.getElementById("photo").files[0]);
    seter.src = (0, $3fffefddab1a405a$export$87d51fc9023e4534)(form, "data");
});
if ($d0f7ce18c37ad6f6$var$userPasswordForm) {
    $d0f7ce18c37ad6f6$var$userPasswordForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        document.querySelector(".btn--save-password").textContent = "Updating...";
        const passwordConfirm = document.getElementById("password-confirm").value;
        const passwordCurrent = document.getElementById("password-current").value;
        const password = document.getElementById("password").value;
        await (0, $3fffefddab1a405a$export$87d51fc9023e4534)({
            passwordCurrent: passwordCurrent,
            password: password,
            passwordConfirm: passwordConfirm
        }, "password");
    });
    document.querySelector(".btn--save-password").textContent = "Save Password";
    document.getElementById("password-current").value = "";
    document.getElementById("password-confirm").value = "";
    document.getElementById("password").value = "";
}
if ($d0f7ce18c37ad6f6$var$bookBtn) $d0f7ce18c37ad6f6$var$bookBtn.addEventListener("click", (e)=>{
    e.target.textContent = "Processing...";
    const { tourId: tourId  } = e.target.dataset;
    (0, $6710bca62beba915$export$8d5bdbf26681c0c2)(tourId);
});


//# sourceMappingURL=bundle.js.map
