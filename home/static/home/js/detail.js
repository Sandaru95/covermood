/* ===================== Content */
/* ================== 1. General */
/* ================== 2. On load */
/* ================== 3. Detail Section */





/* ========================================= 1. General */
// Ghost image drag disable
for(img of document.getElementsByTagName('img')){img.setAttribute('draggable', false)};
/* ========================================= 2. Onload */
((global) => {
    // References
    let objectDetail = document.getElementById('object-detail');
    let objectDetailAction = document.getElementById('object-detail-action');
    let objectDetailImg = document.querySelector('#object-detail-img');
    let objectDetailTitle = document.querySelector('#object-detail h4');
    let objectDetailLastText = document.querySelector('#object-detail h5:last-child');
    // Image Loads
    setTimeout(() => {
        objectDetailImg.classList.add('animated', 'zoomInUp');
        objectDetailImg.style.display = "inline-block";
        setTimeout(() => {
            objectDetailImg.classList.remove('animated', 'zoomInUp');
        }, 3000);
    }, 1200);
    // Text Loads
    setTimeout(() => {
        objectDetailTitle.classList.add('animated', 'fadeIn');
        objectDetailLastText.classList.add('animated', 'fadeIn');
        objectDetailTitle.style.display = "inline-block";
        objectDetailLastText.style.display = "inline-block";

        setTimeout(() => {
            objectDetailTitle.classList.remove('animated', 'fadeIn');
            objectDetailLastText.classList.remove('animated', 'fadeIn');
        }, 3000);
    }, 1500);
    // Button Loads
    setTimeout(() => {
        for(let button of objectDetailAction.getElementsByTagName('a')){
            button.classList.add('animated', 'bounce');
            button.style.display = "inline-block";
            setTimeout(() => {
                button.classList.remove('animated', 'bounce');
            }, 4000);
        };
    }, 1900);
})(window);
/* ========================================= 3. Detail  Section */
/* Play Cover  */
function playCover(button){
    let hiddenAudio = document.getElementById('hidden-audio');
    console.log(button.firstElementChild.innerHTML);
    if(button.firstElementChild.innerHTML == "play_arrow"){
        hiddenAudio.load();
        hiddenAudio.play();
        // Changing the Front Icon
        button.firstElementChild.innerHTML = "pause";
    }else{
        hiddenAudio.pause();
        // Changing the Front Icon
        button.firstElementChild.innerHTML = "play_arrow";
    };
};
/* Like Cover */
function likeCover(button){
    $.ajax({
        type: "POST",
        url: `/home/detail/${objPk}/like/`,
        data: {
            "obj_pk": objPk,
            "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
        },
        success: function (data) {
            // Setting The alert
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                },
            });
              
            Toast.fire({
                icon: 'success',
                title: 'Cover Liked!'
            });
            // Setting the Front +1
            button.innerHTML = `<i class='material-icons'>whatshot</i> +${data}`;
        }
    });
};
/* Download Cover  */
function downloadCover(button){
    window.open(objMergedRecord, '_blank');
};