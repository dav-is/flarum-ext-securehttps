import app from 'flarum/app';
import { extend } from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';

app.initializers.add('davis-securehttps-forum', function() {
    extend(CommentPost.prototype, 'init', function() {
        this.imageonerror = "$(this).next().empty().append('<blockquote style=&#92;'background-color: #c0392b; color: white;&#92;' class=&#92;'uncited&#92;'><div><p>"+app.translator.trans('davis-securehttps.forum.removed')+"</p></div></blockquote>');$(this).hide();";
        this.props.post.contentHtml = m.prop(
            this.props.post.contentHtml().replace(
                /<img src="http:\/\/(.+)" title="(.*)" alt="(.*)">/g,
                '<img onerror="'+this.imageonerror+'" onload="$(this).next().empty();" class="securehttps-replaced" src="https://$1" title="$2" alt="$3"><span><br><br><i class="icon fa fa-spinner fa-spin fa-3x fa-fw"></i> Loading Image<br></span>'
            )
        );
    });
});