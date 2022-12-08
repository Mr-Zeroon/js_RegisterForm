function main() {
    let isEditFlag = {
        flag: false,
        indexEdit : -1,
    }
    const eleBtnReset = document.querySelector('.js-btn-reset')
    const eleForm = document.querySelector('.form-register')
    const eleInputUserName = document.querySelector('#username')
    const eleInputPassWord = document.querySelector('#password')
    const eleInputFirstName = document.querySelector('#firstName')
    const eleInputLastName = document.querySelector('#lastName')
    const eleContentResult = document.querySelector('.js-result')
    const eleContentTable = document.querySelector('.table')
    const listData = JSON.parse(localStorage.getItem('listData')) || [];
    //JSON.parse(localStorage.getItem('listData')) : Chuyển string sang mảng
    function handleResetForm(){
        eleForm.reset()
    }
    function handleUpdateFromData(formData){//Sửa
        eleInputUserName.value = formData?.username;
        eleInputPassWord.value = formData?.password;
        eleInputLastName.value = formData?.lastname;
        eleInputFirstName.value = formData?.firstname;
        if(formData?.gender==='Nam'){
            document.querySelector('[value="Nam"]').checked = true;
        }
        if(formData?.gender==='Nữ'){
            document.querySelector('[value="Nữ"]').checked = true;
        }
        if(formData?.gender===undefined){
            document.querySelector('[value="Nam"]').checked = false;
            document.querySelector('[value="Nữ"]').checked = false;
        }
        eleForm.style.display = 'none';
        eleForm.style.display = 'block';
    }
    function handleResetError() {
        document.querySelector('.js-err-user-name').textContent = ""
      }
    
    function renderDataTable(){
        // if(listData.length === 0) return
        console.log(listData,'listData')
        let result = ''
        listData.forEach((data,index )=>{ //Đánh "," thứ 2 nó đánh số từ 0->n
            let computedGenderClass = ''
            switch(data?.gender){
                case 'Nam':
                    computedGenderClass='gender-male'
                    break
                case 'Nữ':
                    computedGenderClass='gender-female'
                    break
                default:
                    computedGenderClass='gender-unknown'
                    break
            }
            result += 
            `<tr class="${computedGenderClass}">
                <td>${data?.username}</td>
                <td>${data?.password}</td>
                <td>${data?.firstname}</td>
                <td>${data?.lastname}</td>
                <td>${data?.gender||'Không rõ'}</td>
                <td>
                    <button class="Xoa" data-index=${index}>Xoá</button>
                    <button class="Sua" data-index-edit=${index}>Sửa</button>
                </td>
          </tr>`
        })
        eleContentResult.innerHTML=result
        document.querySelectorAll(`[data-index]`).forEach((eleBtn)=>{
            eleBtn.addEventListener('click',()=>{
                const dataIndex = eleBtn.getAttribute("data-index")
                listData.splice(Number(dataIndex),1)
                localStorage.setItem('listData',JSON.stringify(listData))
                renderDataTable()
            })
        })
        document.querySelectorAll(`[data-index-edit]`).forEach((eleBtn)=>{
            eleBtn.addEventListener('click',()=>{
                const dataIndex = eleBtn.getAttribute("data-index-edit");
                isEditFlag = {
                    flag:true,
                    indexEdit: dataIndex
                }
                const currentDataEdit = listData[Number(dataIndex)];
                handleUpdateFromData(currentDataEdit)
                 console.log(currentDataEdit)
            })
        })
    }
    eleBtnReset.addEventListener('click',(event) => {
        event.preventDefault();
        handleResetForm();
        handleResetError();
    });
    
    eleForm.addEventListener('submit',(event) =>{
        event.preventDefault()
       const fromValue = {
        username: eleInputUserName.value,
        password: eleInputPassWord.value,
        firstname: eleInputFirstName.value,
        lastname: eleInputLastName.value,
        // name="gender" xác định radio ; :checked lấy 1 giá trị đc đánh dấu
        gender: document.querySelector('[name="gender"]:checked')?.value
    
        
       }
       if (!fromValue.username) {
        document.querySelector('.js-err-user-name').textContent = "Vui lòng nhập username!!!"
        return
      }
      if(isEditFlag.flag){
        //Handle edit
        
        listData[isEditFlag.indexEdit]=fromValue
        isEditFlag = {
            flag: false,
            indexEdit : -1,
        }
      }
      else {
        listData.push(fromValue)
      }
      localStorage.setItem('listData',JSON.stringify(listData)) //JSON.stringify(listData):Chuyển dữ liệu sang dạng String
      
      renderDataTable()
      handleResetError()
      handleResetForm()
    })
    if(listData.length>0) renderDataTable(); // phải render mới hiện ra localStorage
    
    }
    
    main()
    