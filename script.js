document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.querySelector(".name").value.trim();
        const email = form.querySelector(".email").value.trim();
        const message = form.querySelector(".textarea").value.trim();

        // Telegram API uchun kerakli ma’lumotlar
        const token = "8663828463:AAFCPloGvPSVW4Gph_hFwjbhxOFx1nkKkU0";
        const chat_id = "5833039883";
        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        const text = `
📩 *Yangi ariza!*
👤 Ismi: *${name}*
📞 Telefon: *${email}*
💬 Izoh: ${message}
    `;
        console.log(text);

        // API orqali yuborish
        fetch(telegramUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chat_id,
                text: text
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.ok) {
                    Swal.fire({
                        title: "Yuborildi",
                        text: "Xabar muvaffaqiyatli jo'natildi",
                        icon: "success"
                    });
                    form.reset();
                } else {
                    Swal.fire({
                        title: "Xatolik",
                        text: data.description || "Xatolik yuz berdi",
                        icon: "error"
                    });
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: "Xatolik",
                    text: "Server bilan ulanishda muammo",
                    icon: "error"
                });
            });
    });
});
