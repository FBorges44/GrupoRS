// CONFIGURAÇÃO:
    // Quando a empresa definir o WhatsApp, informe o número com código do país,
    // DDD e número, somente dígitos. Exemplo: "5586999999999".
    const WHATSAPP_NUMBER = "5586999689918";

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
        menuToggle.focus();
      }
    });

    document.getElementById("year").textContent = new Date().getFullYear();

    const serviceSelect = document.getElementById("service");
    document.querySelectorAll(".service-link[data-service]").forEach(link => {
      link.addEventListener("click", () => {
        serviceSelect.value = link.dataset.service;
      });
    });

    const portfolioFilters = document.querySelectorAll(".portfolio-filter");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    portfolioFilters.forEach(filter => {
      filter.addEventListener("click", () => {
        const category = filter.dataset.filter;

        portfolioFilters.forEach(button => {
          const isActive = button === filter;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });

        portfolioItems.forEach(item => {
          item.hidden = category !== "all" && item.dataset.category !== category;
        });
      });
    });

    const portfolioLightbox = document.getElementById("portfolioLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    portfolioItems.forEach(item => {
      item.addEventListener("click", () => {
        const image = item.querySelector("img");
        const label = item.querySelector(".portfolio-label");
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = `${label.querySelector("span").textContent} — ${label.querySelector("strong").textContent}`;
        portfolioLightbox.showModal();
      });
    });

    document.getElementById("lightboxClose").addEventListener("click", () => {
      portfolioLightbox.close();
    });
    portfolioLightbox.addEventListener("click", event => {
      if (event.target === portfolioLightbox) portfolioLightbox.close();
    });

    const whatsappCta = document.getElementById("whatsappCta");
    const quickMessage = encodeURIComponent("Olá, Grupo RS! Gostaria de conversar sobre um serviço.");
    whatsappCta.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${quickMessage}`;

    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      const revealTargets = document.querySelectorAll(".service-card, .step, .about-copy, .about-visual, .contact-panel, .portfolio-item");
      document.body.classList.add("has-reveal");
      revealTargets.forEach(target => {
        target.classList.add("reveal");
        revealObserver.observe(target);
      });
    }

    document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const formMessage = document.getElementById("formMessage");
      const formData = new FormData(this);
      const name = formData.get("name").trim();
      const phone = formData.get("phone").trim();
      const email = formData.get("email").trim();
      const service = formData.get("service");
      const message = formData.get("message").trim();

      const text = [
        "Olá, Grupo RS! Gostaria de solicitar informações/orçamento.",
        "",
        `Nome: ${name}`,
        `Telefone: ${phone}`,
        `E-mail: ${email}`,
        `Serviço: ${service}`,
        "",
        `Descrição: ${message}`
      ].join("\n");

      if (!WHATSAPP_NUMBER) {
        formMessage.textContent =
          "O WhatsApp comercial ainda não foi configurado. Adicione o número da empresa à variável WHATSAPP_NUMBER no arquivo js/script.js.";
        formMessage.classList.add("visible");
        return;
      }

      const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
      if (cleanNumber.length < 12 || cleanNumber.length > 13) {
        formMessage.textContent =
          "O número de WhatsApp configurado parece inválido. Confira o código do país, DDD e número.";
        formMessage.classList.add("visible");
        return;
      }

      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
      window.location.assign(whatsappUrl);
    });
