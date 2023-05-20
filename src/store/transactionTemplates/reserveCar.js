export const reserveCarTemplate = (data) =>{
    const html = `
    <html dir="rtl" lang="ar">
      <body>
        <h1>فك حجز مركبة</h1>
        <p>القضية التنفيذية </p>
        <p>حضر المنفذ له بالذات ${data.userExcutionForResult} وطلب إشعار المنفذ ضده بالحجز الواقع على المركبة (${data.carNumber}) من أجل ضبطها لدى الشرطة وعلى ذلك جرى التوقيع حسب الأصول</p>
        <br></br>
        <br></br>

        <br></br>
        <div style="display: flex; justify-content: space-between;">
            <p><strong>المنفذ له</strong></p>
            <p><strong>مأمور التنفيذ</strong></p>
        </div>
      </body>
    </html>
    `;

    return html;
}