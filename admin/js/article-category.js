$(function () {
    // 抽取的获取分类的方法
    function getCategoryData() {
        // 获取文章类别数据
        $.ajax({
            url: BigNew.category_list,
            success: function (backData) {
                console.log(backData);
                // 调用模板引擎的方法

                // 传入数据
                var html = template('cateTem', backData);
                console.log(html);

                // 渲染页面 tr放到tbody中
                $('tbody').html(html);
            }
        })
    }
    getCategoryData();
    // 点击新增分类
    $('.btn-primary').click(function () {
        var name = $('.cate-name').val();
        var slug = $('.cate-slug').val();
        console.log(name);
        console.log(slug);

        // ajax
        $.ajax({
            url: BigNew.category_add,
            type: 'POST',
            data: {
                name: name,
                slug: slug,
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 201) {
                    // 成功了
                    $('#myModal').modal('hide');
                    getCategoryData();
                }
            }
        })
    })


    // 点击删除 
    $('tbody').on('click', '.btn-delete', function () {
        // 获取id
        var id = $(this).attr('data-id');
        $.ajax({
            url: BigNew.category_delete,
            type: 'post',
            data: { id: id },
            success: function (backData) {
                console.log(backData);
                // 如果删除成功
                // 重新获取数据
                if (backData.code == 204) {
                    getCategoryData();

                }
            }
        })
    })

    // 点击编辑按钮进入编辑状态
    $('tbody').on('click', '.btn-info', function () {
        // 获取id
        var id = $(this).next().attr('data-id');
        // ajax获取数据
        $.ajax({
            url: BigNew.category_search,
            data: {
                id: id
            },
            success: function (backData) {
                console.log(backData);
                // 弹出模态框
                $('.edit-name').val(backData.data[0].name);
                $('.edit-slug').val(backData.data[0].slug);
                // 额外保存id
                $('.edit-id').val(backData.data[0].id);
                // 弹出框
                $('#editModal').modal('show');

            }
        })
    })

    // 点击保存
    $('#editModal .btn-success').click(function(){
        var id=$('.edit-id').val();
        var name=$('.edit-name').val();
        var slug=$('.edit-slug').val();
        $.ajax({
            url:BigNew.category_edit,
            type:'post',
            data:{
                id:id,
                name:name,
                slug:slug
            },
            success:function(backData)
            {
                // console.log(backData);
                if(backData.code==200)
                {
                    // 关闭弹框
                    $('#editModal').modal('hide');
                    // 重新获取数据
                    getCategoryData();
                }
                
            }
        })
    })
})