var af;!function(s){"undefined"!=typeof acf?((af={forms:{},setup_form:function(e){var t=e.attr("data-key"),n={$el:e,key:t,submissionSteps:[]};this.pages.initialize(n),this.ajax.initialize(n),this.forms[t]=n;var i=this;n.$el.on("submit",function(e){e.preventDefault(),acf.validation.fetch({form:n.$el,lock:!1,reset:!0,success:function(){var e=n.submissionSteps.slice();i.executeSubmissionSteps(n,e)}})}),acf.doAction("af/form/setup",n)},addSubmissionStep(e,t,n){for(var i={priority:t,fn:n},a=0;a<e.submissionSteps.length;a++)if(t<e.submissionSteps[a].priority)return void e.submissionSteps.splice(a,0,i);e.submissionSteps.push(i)},executeSubmissionSteps(e,t){function n(){e.$el.get(0).submit()}var i,a,s;0!=t.length?(i=t.shift(),a=this,s=0==t.length?n:function(){a.executeSubmissionSteps(e,t)},i.fn(s)):n()}}).pages={initialize:function(a){var e,t=this;$page_fields=a.$el.find(".acf-field-page"),$page_fields.exists()&&(a.pages=[],a.current_page=0,a.max_page=0,a.show_numbering=!0,a.$page_wrap=s('<div class="af-page-wrap">'),a.$page_wrap.insertBefore($page_fields.first()),a.$previous_button=$page_fields.first().find(".af-previous-button"),a.$next_button=$page_fields.first().find(".af-next-button"),a.show_numbering="true"===$page_fields.first().find(".af-page-button").attr("data-show-numbering"),a.$previous_button.click(function(e){e.preventDefault(),t.previousPage(a)}),a.$next_button.click(function(e){e.preventDefault(),t.nextPage(a)}),(e=a.$el.find(".af-submit")).prepend(a.$next_button),e.prepend(a.$previous_button),a.$submit_button=e.find(".af-submit-button"),$page_fields.each(function(t,e){var n=s(e),i=n.find(".af-page-button").attr("data-index",t);i.click(function(e){e.preventDefault(),af.pages.navigateToPage(t,a)}),a.show_numbering&&($index=s('<span class="index">').html(t+1),i.prepend($index)),a.$page_wrap.append(i);e=n.nextUntil(".acf-field-page",".acf-field");a.pages.push({$field:n,$fields:e,$button:i})}),this.refresh(a))},refresh:function(i){s.each(i.pages,function(e,t){var n=e==i.current_page;t.$button.toggleClass("enabled",e<=i.max_page),t.$button.toggleClass("current",n),t.$fields.each(function(){s(this).toggle(n)})});var e=this.isFirstPage(i),t=this.isLastPage(i);i.$previous_button.attr("disabled",!!e||null),i.$next_button.toggle(!t),i.$submit_button.toggle(t)},nextPage:function(e){var t;this.isLastPage(e)||(t=this).validatePage(e,e.current_page,function(){t.changePage(e.current_page+1,e)})},previousPage:function(e){this.isFirstPage(e)||this.changePage(e.current_page-1,e)},navigateToPage:function(e,t){var n;e<0||e>t.max_page||(n=this).validatePage(t,t.current_page,function(){n.changePage(e,t)})},changePage:function(e,t){var n=t.current_page;t.current_page=e,t.max_page<=t.current_page&&(t.max_page=t.current_page),this.refresh(t),acf.doAction("af/form/page_changed",e,n,t)},isFirstPage:function(e){return 0==e.current_page},isLastPage:function(e){return e.current_page==e.pages.length-1},validatePage:function(t,n,e){t.pages[n].$fields.find("input").each(function(){this.checkValidity()});function a(e){for(i=0;i<t.pages.length;i++)i!=n&&e(t.pages[i])}a(function(e){e.$fields.detach()});function s(){a(function(e){e.$fields.insertAfter(e.$field)})}acf.validation.fetch({form:t.$el,lock:!1,reset:!0,success:function(){s(),e()},failure:function(){s()}})}},af.ajax={initialize:function(t){var n=this;t.$el.is("[data-ajax]")&&af.addSubmissionStep(t,100,function(e){n.sendSubmission(t)})},sendSubmission:function(e){acf.validation.lockForm(e.$el);var t=new FormData(e.$el.get(0));t.append("action","af_submission"),s.ajax({url:acf.get("ajaxurl"),data:t,processData:!1,contentType:!1,type:"post",success:this.onSuccess(e),error:this.onError(e),complete:function(){acf.validation.unlockForm(e.$el)}})},onSuccess:function(i){return function(e){var t=e.data;switch(acf.doAction("af/form/ajax/submission",t,i),t.type){case"success_message":var n=s(t.success_message);i.$el.find(".af-fields").replaceWith(n);break;case"redirect":window.location.href=t.redirect_url}}},onError:function(n){return function(e){var t=n.$el.data("acf"),e=e.responseJSON.data.errors;t.addErrors(e),t.showErrors()}}},s(document).ready(function(){s(".af-form").each(function(){af.setup_form(s(this))})})):console.error("acf-input.js not found. AF requires ACF to work.")}(jQuery);