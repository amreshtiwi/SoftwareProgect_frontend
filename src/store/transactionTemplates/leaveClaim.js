export const leaveClaimTemplate = (data) =>{
    const html = `
    <html dir="rtl" lang="ar">
      <body>
        <h1>ترك دعوى قضائية</h1>
        <p> </p>
        <p>حضر المنفذ له بالذات ${data.userExcutionForResult} وطلب ترك الدعوى المرموقة ترك ${data.claimTypeOrder} وبذات الوقت استرداد المبرزات اصل الشيكات في هذه الدعوى حسب الاصول القانون وعليه جرى التوقيع</p>
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