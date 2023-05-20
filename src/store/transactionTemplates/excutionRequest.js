export const exutionRequestTemplate = (data) =>{
    const html = `
    <html dir="rtl" lang="ar">
      <body>
        <h1>طلب تنفيذ</h1>
        <p>المحكمة التي أصدر الحكم <strong>${data.excutionOrder}</strong></p>
        <p>المنفذ له :</p>
        <span>${data.userExcutionForResult}</span>
        <br></br>
        <p>المنفذ عليه :</p>
        <span>${data.userExcutionOnResult}</span>
        <br></br>
        <p>المحكوم به:</p>
        <span>${data.amountClaim}</span>
        <span>بموجب ${data.excutionOrder} </span>
        <span>مستحق ومحرر بتاريخ ${data.claimDate}</span>
        <p>طلب تنفيذ إعلام الحكم المبين أعلاه لدى دائرة التنفيذ وعليه سطرت ورقة الإخبار إلى المنفذ عليه بعد استيفاء الرسم القانوني حسب الأصول </p>
      </body>
    </html>
    `;
    return html;
}