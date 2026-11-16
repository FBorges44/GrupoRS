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

    document.getElementById("year").textContent = new Date().getFullYear();

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
