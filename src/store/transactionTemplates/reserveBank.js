export const reserveBankTemplate = (data) =>{
    const html = `
    <html dir="rtl" lang="ar">
      <body>
        <h1>فك حجز مركبة</h1>
        <p>حضر المنفذ له بالذات ${data.userExcutionForResult} وطلب تسطير كتاب للحجز على الأموال السائلة لدى البنوك بإسم المنفذ ضده وعليه جرى التوقيع</p>
         <br></br>
        <br></br>

        <br></br>
        <div style="display: flex; justify-content: space-between;">
            <p><strong>المنفذ ضده</strong></p>
            <p><strong>مأمور التنفيذ</strong></p>
        </div>
      </body>
    </html>
    `;

    return html;
}