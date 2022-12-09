window.addEventListener("DOMContentLoaded", function () {
    //הוספת מאזינים לכפתורים
    document.getElementById("find-me").addEventListener("click", geoFindMe);
    document.getElementById("shareBtn").addEventListener("click", share);
})


//משתנים גלובלים לשיתוף קווי אורך ורוחב
let globalLatitude = "";
let globalLongitude= "";


// בלחיצה על כפתור חיפוש המיקום
function geoFindMe() {
    //יצירת משתנים
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    const iframe = document.querySelector('#iframe');

    //איפוס קישורים
    mapLink.href = '';
    mapLink.textContent = '';

    //בדיקה האם הדפדפן תומך במציאת מיקום
    if (!navigator.geolocation) {
        status.textContent = 'הדפדפן אינו תומך בשירות זה';
      } else {
        status.textContent = 'מאתר את מיקומך...';
        navigator.geolocation.getCurrentPosition(success, error);
      }

      //מצליח לאתר מיקום
      function success(position) {
        //משתנים לנתוני הקווים
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
      
        //הצגת קווי אורך ורוחב
        status.textContent = '';
        mapLink.textContent = `קו רוחב: ${latitude} °, קו אורך: ${longitude} °`;
        mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
        iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`
        iframe.classList.remove("d-none")

        globalLatitude = latitude.toString();
        globalLongitude = longitude.toString();
      }

      //לא מצליח לאתר מיקום    
      function error() {
        status.textContent = 'מיקומך אינו זמין';
      }
    
}



//בלחיצה על כפתור שיתוף
function share() {

    //מידע על מה שרוצים לשתף
    const shareData = {
        title: 'נתוני המיקום שלי',
        text: 'קו רוחב'+ globalLatitude + 'קו אורך' + globalLongitude
    }
      
      const btn = document.querySelector('#shareBtn');
           
      // פונקציה אסינכרונית
      //מחכים שהדפדף יוכל לשתף את המידע שהגדרנו שרוצים לשתף
      btn.addEventListener('click', async () => {
        try {
          await navigator.share(shareData);
          //resultPara.textContent = 'המידע שותף בהצלחה!';
        } catch (err) {
          //resultPara.textContent = `שגיאה: ${err}`;
        }
      });
}