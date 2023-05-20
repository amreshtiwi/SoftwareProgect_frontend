export const refferalMedicalCommitee = (data) =>{
    const html = `
    <html dir="rtl" lang="ar">
      <body>
        <h1 style="text-align: center;">السيد / رئيس ${data.medicalComitteOrder} في مدينة ${data.city} </h1>
        <p>تحية طيبة وبعد,,</p>
        <p style="font-size: 14px;font-weight: bold;">الموضوع: ${data.userExcutionForResult}</p>
        <p>عملاً بقرار المحكمة على الاستدعاء المقدم من قبل المستدعي ${data.userExcutionForResult} في الطلب رقم (${data.requestNumber}) لجنة طبية فقد تقرر الكتابة لحضرتكم من اجل إحالة المستدعي المذكور اعلاه الى ${medicalComitteOrder} لغايات فحصه وتحديد مدة التعطيل ونسبة العجز الدائم ان وجدت, وذلك بعد استيفاء الرسوم القانونية المترتبة على ذلك , لإجراءاتكم لطفاً </p>
        <br></br>
        <br></br>

        <br></br>
        <div style="display: flex; justify-content: space-between;">
            <p><strong>رئيس قلم حقوق المحكمة</strong></p>
        </div>
      </body>
    </html>
    `;

    return html;
}