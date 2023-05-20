export const detentionRequestTemplate = (data) =>{
    const html = `
    <html dir="rtl" lang="ar">
      <body>
        <h1>طلب أمر حبس</h1>
        <p>حضر المنفذ له بالذات ${data.userExcutionForResult} وطلب حبس المحكوم عليه لتبلغه حسب الأصول وعدم عرض تسوية قانونية وبذات الوقت الحجز على اموالها لدى البنوك العاملة في فلسطين ولدى وزارة النقل والمواصلات وتسطير الكتب اللازمة لذلك, وعليه جرى التوقيع</p>
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