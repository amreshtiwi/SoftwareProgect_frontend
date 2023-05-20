export const reciptPaymentTemplate = (data) =>{
    const html = `
    <html dir="rtl" lang="ar">
      <body>
        <h1>فك حجز مركبة</h1>
        <p>القضية التنفيذية </p>
        <p>حضر المنفذ له بالذات ${data.userExcutionForResult} وأقر بإستلامة مبلغ ${data.amountClaim} وبذات الوقت طلب استئخار واسترداد أمر الحبس لوجود مساعي مصالحة حسب الأصول والقانون, وعليه جرى التوقيع</p>
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