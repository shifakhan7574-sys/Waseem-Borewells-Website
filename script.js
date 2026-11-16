
/* =========================================
   WASIM BOREWELLS & PUMPS
   Website JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // BUSINESS DETAILS
    const businessName = "Wasim Borewells & Pumps";
    const businessWhatsApp = "919359519267";

    // OPEN WHATSAPP
    function openWhatsApp(message) {
        const url = `https://wa.me/${businessWhatsApp}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    }

    // CURRENT YEAR
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.textContent = "☰";
            });
        });

        document.addEventListener("click", event => {
            if (
                navLinks.classList.contains("active") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.textContent = "☰";
            }
        });
    }

    // SCROLL REVEAL
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // CATALOGUE DATA
    // Prices are intentionally not displayed until confirmed.
    const catalogueItems = [
        {
            id: 1,
            name: "4.75-inch Borewell",
            category: "borewell",
            description: "Borewell size enquiry"
        },
        {
            id: 2,
            name: "5.75-inch Borewell",
            category: "borewell",
            description: "Borewell size enquiry"
        },
        {
            id: 3,
            name: "6-inch Borewell",
            category: "borewell",
            description: "Borewell size enquiry"
        },
        {
            id: 4,
            name: "6.5-inch Borewell",
            category: "borewell",
            description: "Borewell size enquiry"
        },
        {
            id: 5,
            name: "7.25-inch Borewell",
            category: "borewell",
            description: "Borewell size enquiry"
        },
        {
            id: 6,
            name: "8-inch Borewell",
            category: "borewell",
            description: "Borewell size enquiry"
        },
        {
            id: 7,
            name: "5-inch PVC Pipe",
            category: "pipes",
            description: "PVC pipe enquiry"
        },
        {
            id: 8,
            name: "6-inch PVC Pipe",
            category: "pipes",
            description: "PVC pipe enquiry"
        },
        {
            id: 9,
            name: "7-inch PVC Pipe",
            category: "pipes",
            description: "PVC pipe enquiry"
        },
        {
            id: 10,
            name: "8-inch PVC Pipe",
            category: "pipes",
            description: "PVC pipe enquiry"
        },
        {
            id: 11,
            name: "10-inch PVC Pipe",
            category: "pipes",
            description: "PVC pipe enquiry"
        },
        {
            id: 12,
            name: "Submersible Pump Installation",
            category: "pumps",
            description: "Pump fitting and installation"
        },
        {
            id: 13,
            name: "Submersible Pump Repair",
            category: "pumps",
            description: "Pump inspection and repair"
        },
        {
            id: 14,
            name: "Plumbing Services",
            category: "services",
            description: "Water connections and plumbing"
        }
    ];

    // CATALOGUE ELEMENTS
    const catalogueList = document.getElementById("catalogueList");
    const catalogueSearch = document.getElementById("catalogueSearch");
    const catalogueEmpty = document.getElementById("catalogueEmpty");
    const selectedItemsContainer = document.getElementById("selectedItems");
    const cartCount = document.getElementById("cartCount");
    const sendCatalogueEnquiry = document.getElementById("sendCatalogueEnquiry");

    let activeCategory = "all";
    let searchText = "";

    const selectedItems = new Set();

    // DISPLAY CATALOGUE
    function renderCatalogue() {
        if (!catalogueList) return;

        catalogueList.innerHTML = "";

        const filteredItems = catalogueItems.filter(item => {
            const matchesCategory =
                activeCategory === "all" ||
                item.category === activeCategory;

            const matchesSearch =
                item.name.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText);

            return matchesCategory && matchesSearch;
        });

        if (catalogueEmpty) {
            catalogueEmpty.hidden = filteredItems.length !== 0;
        }

        filteredItems.forEach(item => {
            const isSelected = selectedItems.has(item.id);

            const card = document.createElement("article");
            card.className = "catalogue-item";

            const details = document.createElement("div");

            const title = document.createElement("h4");
            title.textContent = item.name;

            const description = document.createElement("p");
            description.textContent = `${item.description} · Price on request`;

            details.append(title, description);

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = isSelected ? "Added ✓" : "Add +";
            button.setAttribute("aria-pressed", String(isSelected));
            button.disabled = isSelected;

            if (isSelected) {
                button.style.opacity = "0.65";
                button.style.cursor = "default";
            }

            button.addEventListener("click", () => {
                selectedItems.add(item.id);
                renderCatalogue();
                renderSelectedItems();
            });

            card.append(details, button);
            catalogueList.appendChild(card);
        });
    }

    // DISPLAY SELECTED ITEMS
    function renderSelectedItems() {
        if (!selectedItemsContainer || !cartCount || !sendCatalogueEnquiry) {
            return;
        }

        selectedItemsContainer.innerHTML = "";

        const selectedProducts = catalogueItems.filter(item =>
            selectedItems.has(item.id)
        );

        cartCount.textContent =
            `${selectedProducts.length} ${selectedProducts.length === 1 ? "item" : "items"}`;

        sendCatalogueEnquiry.disabled = selectedProducts.length === 0;

        if (selectedProducts.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "empty-cart";
            emptyMessage.textContent = "Your selected items will appear here.";
            selectedItemsContainer.appendChild(emptyMessage);
            return;
        }

        selectedProducts.forEach(item => {
            const row = document.createElement("div");
            row.className = "selected-item";

            const name = document.createElement("span");
            name.textContent = item.name;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "remove-item";
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", () => {
                selectedItems.delete(item.id);
                renderCatalogue();
                renderSelectedItems();
            });

            row.append(name, removeButton);
            selectedItemsContainer.appendChild(row);
        });
    }

    // SEARCH CATALOGUE
    if (catalogueSearch) {
        catalogueSearch.addEventListener("input", event => {
            searchText = event.target.value.trim().toLowerCase();
            renderCatalogue();
        });
    }

    // FILTER CATALOGUE
    document.querySelectorAll(".filter-button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-button").forEach(filter => {
                filter.classList.remove("active");
                filter.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            activeCategory = button.dataset.category || "all";
            renderCatalogue();
        });
    });

    // SEND CATALOGUE ENQUIRY
    if (sendCatalogueEnquiry) {
        sendCatalogueEnquiry.addEventListener("click", () => {
            const selectedProducts = catalogueItems.filter(item =>
                selectedItems.has(item.id)
            );

            if (selectedProducts.length === 0) return;

            const itemList = selectedProducts
                .map((item, index) => `${index + 1}. ${item.name}`)
                .join("\n");

            const message =
                `Hello ${businessName},\n\n` +
                `I would like to enquire about the following items:\n\n` +
                `${itemList}\n\n` +
                `Please share the prices, specifications and availability.\n\n` +
                `Thank you.`;

            openWhatsApp(message);
        });
    }

    // SERVICE LINKS: PRESELECT CONTACT FORM SERVICE
    document.querySelectorAll("[data-service]").forEach(link => {
        link.addEventListener("click", () => {
            const serviceSelect = document.getElementById("serviceType");

            if (serviceSelect) {
                serviceSelect.value = link.dataset.service;
            }
        });
    });

    // ESTIMATE FORM
    const estimateForm = document.getElementById("estimateForm");

    if (estimateForm) {
        estimateForm.addEventListener("submit", event => {
            event.preventDefault();

            const workType = document.getElementById("workType")?.value.trim();
            const boreSize = document.getElementById("boreSize")?.value.trim();
            const depth = document.getElementById("depth")?.value.trim();
            const location = document.getElementById("customerLocation")?.value.trim();
            const name = document.getElementById("estimateName")?.value.trim();
            const phone = document.getElementById("estimatePhone")?.value.trim();

            if (!workType || !location || !name || !phone) {
                alert("Please complete all required fields.");
                return;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Please enter a valid 10-digit mobile number.");
                return;
            }

            const message =
                `Hello ${businessName},\n\n` +
                `I would like to request an estimate.\n\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Requirement: ${workType}\n` +
                `Borewell Size: ${boreSize || "Not specified"}\n` +
                `Expected Depth: ${depth ? depth + " feet" : "Not specified"}\n` +
                `Location: ${location}\n\n` +
                `Please contact me with further details.\n\nThank you.`;

            openWhatsApp(message);
        });
    }

    // CONTACT FORM
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            const name = document.getElementById("customerName")?.value.trim();
            const phone = document.getElementById("customerPhone")?.value.trim();
            const service = document.getElementById("serviceType")?.value.trim();
            const details = document.getElementById("customerMessage")?.value.trim();

            if (!name || !phone || !service) {
                alert("Please complete all required fields.");
                return;
            }

            const phoneDigits = phone.replace(/\D/g, "");

            if (phoneDigits.length < 10 || phoneDigits.length > 15) {
                alert("Please enter a valid phone number.");
                return;
            }

            const message =
                `Hello ${businessName},\n\n` +
                `I have a project enquiry.\n\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Service Required: ${service}\n` +
                `Project Details: ${details || "Not provided"}\n\n` +
                `Please contact me with further information.\n\nThank you.`;

            openWhatsApp(message);
        });
    }

    // INITIALIZE CATALOGUE
    renderCatalogue();
    renderSelectedItems();

});
