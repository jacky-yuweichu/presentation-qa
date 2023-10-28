// Wait for the document to load before running the script 
(function ($) {
  
  // We use some Javascript and the URL #fragment to hide/show different parts of the page
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page
  $(window).on('load hashchange', function(){
    
    // First hide all content regions, then show the content-region specified in the URL hash 
    // (or if no hash URL is found, default to first menu item)
    $('.content-region').hide();
    
    // Remove any active classes on the main-menu
    $('.main-menu a').removeClass('active');
    var region = location.hash.toString() || $('.main-menu a:first').attr('href');
    
    // Now show the region specified in the URL hash
    $(region).show();
    
    // Highlight the menu link associated with this region by adding the .active CSS class
    $('.main-menu a[href="'+ region +'"]').addClass('active'); 

    // Alternate method: Use AJAX to load the contents of an external file into a div based on URL fragment
    // This will extract the region name from URL hash, and then load [region].html into the main #content div
    // var region = location.hash.toString() || '#first';
    // $('#content').load(region.slice(1) + '.html')
    
  $('#btn-yes').click(function() {
    alert("別緊張，馬上就要開始了：)");
  });

  $('#btn-no').click(function() {
    alert("Sorry~ 您還是得聽接下來的內容：(");
  });
  

	$('#btn1').click(function() {
		var content = $('#input1').val();
		$('#p1').html(content);
	});
	
  $('#btn2').click(function() {
		$.get("http://localhost:8080/news/list", function(data, status){
      if (data) {
        var displayContent = "[Title] _ [Content] _ [Author]";

        data.forEach(item => {
          displayContent = displayContent + "<br/>";
          displayContent = displayContent + item['title'] + "_" + item['content'] + "_" + item['author'];
        });
        
        $('#p2').html(displayContent);
      } else {
        $('#p2').html("Empty Data");
      }
    });
	});

  $('#btn3').click(function() {
    var count = $('#input2').val();
    var url = "http://localhost:8080/news/list/" + count;

		$.get(url, function(data, status){
      if (data) {
        var displayContent = "[Title] _ [Content] _ [Author]";

        data.forEach(item => {
          displayContent = displayContent + "<br/>";
          displayContent = displayContent + item['title'] + "_" + item['content'] + "_" + item['author'];
        });
        
        $('#p3').html(displayContent);
      } else {
        $('#p3').html("Empty Data");
      }
    });
	});
	
  $('#btn4').click(function() {
    var title = $('#input3').val();
    var content = $('#input4').val();
    var author = $('#input5').val();

    var rqData = {
      "title": title,
      "content": content,
      "author": author,
    }

    var url = "http://localhost:8080/news/data";
    


    $.ajax({
      url:url,
      type:"POST",
      data:rqData,
      contentType:"application/json; charset=utf-8",
      dataType:"json",
      success: function(data, status){
        console.log(data);
        var displayContent = data['title'] + "_" + data['content'] + "_" + data['author'];
        $('#p4').html(displayContent);
      }
    })

    // $.post(url, rqData, function(data, status){
    //   console.log(data);
    //   var displayContent = data['title'] + "_" + data['content'] + "_" + data['author'];
    //   $('#p4').html(displayContent);
    // });
	});
	
  });
  
})(jQuery);