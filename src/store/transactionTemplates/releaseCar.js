export const releaseCarTemplate = (data) =>{
    const html = `
    <html dir="rtl" lang="ar">
      <body>
        <h1>فك حجز مركبة</h1>
        <p>القضية التنفيذية </p>
        <p>حضر المنفذ ضده بالذات ${data.userExcutionForResult} وطلب فك الحجز عن المركبة وفقاً لأحكام المادة (1/96) من قانون التنفيذ النافذ, حيث أنه لم يتم إتخاذ أي إجراء أو بيع على المركبة المحجوز عليها, وعليه تم التوقيع</p>
        
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