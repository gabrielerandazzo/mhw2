const shown_image_btn_list = document.querySelectorAll('.shown-image-btn');
const banner_image = document.querySelector('.banner-image');
const more_brands_btn = document.querySelector('.more-text');
const parts_brand_container = document.querySelector('.parts-brand-container');
const footer_links_list = document.querySelectorAll('.footer-links')
const car_brands_container = document.querySelector('.brand-grid-container')
let parts_brand_expanded = false;
let footer_links_expanded = false;
let shown_image = 1;

const car_brands_array = [
    "assets/fiat.svg",
    "assets/vw.svg",
    "assets/bmw.svg",
    "assets/mercedes.svg",
    "assets/audi.svg",
    "assets/ford.svg",
    "assets/opel.svg",
    "assets/alfa.svg",
    "assets/peugeot.svg",
    "assets/citroen.svg",
    "assets/toyota.svg",
    "assets/nissan.svg",
    "assets/lancia.svg",
    "assets/mini.svg",
    "assets/hyundai.svg",
    "assets/fiat.svg"
];

function reset_selected_imagr_btn() {
    for (const btn of shown_image_btn_list) {
        btn.classList.remove('selected');
    }
}

function set_shown_image_btn_by_id(id) {
    let full_id = '#shown-image-btn-' + id;
    let btn = document.querySelector(full_id);
    reset_selected_imagr_btn();
    btn.classList.add('selected');
}

function set_banner_image_by_id(id) {
    switch (id) {
        case '1':
            banner_image.src = "assets/banner1.jpeg"
            shown_image = 1;
            break;
        case '2':
            banner_image.src = "assets/banner2.jpeg"
            shown_image = 2;
            break;

        case '3':
            banner_image.src = "assets/banner3.jpeg"
            shown_image = 3;
            break;

        case '4':
            banner_image.src = "assets/banner4.jpeg"
            shown_image = 4;
            break;
    }
}

function update_banner_image(event) {
    let btn = event.currentTarget;

    if (btn.classList.contains('selected')) {
        console.log("already selected");
    } else {
        reset_selected_imagr_btn();
        btn.classList.add('selected');
        set_banner_image_by_id(btn.id.charAt(16))
    }
}

for (let btn of shown_image_btn_list) {
    btn.addEventListener("click", update_banner_image);
}

function periodically_update_image() {
    if (shown_image > 3) {
        shown_image = 0;
    }
    shown_image++;
    set_banner_image_by_id(shown_image.toString());
    set_shown_image_btn_by_id(shown_image.toString());
}

setInterval(periodically_update_image, 4000);


function expand_brands_section() {
    const all_brands = document.querySelectorAll('.parts-brand-item');
    if (!parts_brand_expanded) {
        parts_brand_expanded = true;
        parts_brand_container.style.flexWrap = "wrap"
        for (const item of all_brands) {
            item.style.display = "flex";
        }
        more_brands_btn.textContent = "Chiudi";
        let up_arrow = document.createElement('span');
        up_arrow.classList.add('more-btn');
        up_arrow.classList.add('close');
        more_brands_btn.appendChild(up_arrow);
    } else {
        parts_brand_expanded = false;
        more_brands_btn.textContent = "Di più";
        let up_arrow = document.createElement('span');
        up_arrow.classList.add('more-btn');
        more_brands_btn.appendChild(up_arrow);
        parts_brand_container.style.flexWrap = "noWrap"
        if (window.innerWidth < 767) {
            for (const item of all_brands) {
                if (item.dataset.index > 2) {
                    item.style.display = "none";
                }
            }
        } else if (window.innerWidth < 990) {
            for (const item of all_brands) {
                if (item.dataset.index > 6) {
                    item.style.display = "none";
                }
            }
        }
    }
}

more_brands_btn.addEventListener("click", expand_brands_section);

function onWindowSizeChanged() {
    let width = window.innerWidth;
    const all_brands = document.querySelectorAll('.parts-brand-item');
    console.log(width);
    if (!parts_brand_expanded) {
        if (width > 760 && width < 990) {
            for (const item of all_brands) {
                if (item.dataset.index <= 6) {
                    item.style.display = "flex";
                }
            }
        } else if (width > 990) {
            for (const item of all_brands) {
                item.style.display = "flex";
            }
        } else {
            for (const item of all_brands) {
                if (item.dataset.index > 2) {
                    item.style.display = "none";
                }
            }
        }
    }
}
window.addEventListener("resize", onWindowSizeChanged);



function expand_footer_links(event) {
    const all_links_item = document.querySelectorAll('.footer-links-item');
    let index = event.currentTarget.dataset.index;
    if (!footer_links_expanded) {
        event.currentTarget.style.height = 'auto'
        for (const item of all_links_item) {
            if (item.dataset.index === index) {
                item.style.display = "flex"
            }
        }
        footer_links_expanded = true;
    } else {
        event.currentTarget.style.height = '48px'
        for (const item of all_links_item) {
            if (item.dataset.index === index) {
                item.style.display = "none"
            }
        }
        footer_links_expanded = false;
    }

}

for (const item of footer_links_list) {
    item.addEventListener('click', expand_footer_links);
}

for (const image of car_brands_array) {
    let image_container = document.createElement('div');
    let brand_image = document.createElement('img');

    image_container.classList.add('brand-grid-item');
    brand_image.classList.add('brand-grid-item-image');

    brand_image.src = image;

    image_container.appendChild(brand_image);

    car_brands_container.appendChild(image_container);

}


