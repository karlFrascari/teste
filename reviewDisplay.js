localanalytics.localapp.reviewDisplay = function (context) {

		//Definindo Variáveis
		var tamanhoTela = jQuery(document).height();
		var estilo = '.gridIco{vertical-align: bottom; padding: 1px; border:1px solid #F3781F ; cursor:pointer}  .balaoIco{vertical-align: bottom; padding: 1px; cursor:pointer; border:1px solid #333 } .menu-modos {position: relative;  top: 27px;  margin-bottom:21px; color: #F3781F; font-size:15px;} .holderBalao {padding-top: 55px;}  .boxBalao {height: 170px; width: 50%;float: left;  margin-bottom: 60px;} .holderFotos{position: absolute; border:2px solid #E3E3E3;} .verMais{margin-right: 10px; float:right; color: #F3781F;font-weight: bold;line-height: 25px; cursor: pointer;} .depoimentoUnico{position: absolute; z-index: 10; font-size:12px; width: 127px; height: 90px; padding: 20px; margin-left: 140px; line-height: 16px;  margin-top: -20px;  background: url(http://www.clipartbest.com/cliparts/4ib/zgn/4ibzgn5ig.png) no-repeat; background-size: 172px 142px; }.ulFotoUnica {margin-top:176px; position:absolute} .divLightBox {position:absolute; left:50%; top:50%; display:none; height:250px; width:500px; z-index:9999; margin-top:-125px; margin-left:-250px;} .btnFecharlb{position:relative; left:63px; float:right; display:block; height:50px; width:50px; background:url(http://www.unhastenshi.com.br/close-button.png) no-repeat} .fundoPreto {position:absolute; background-color: rgba(0,0,0,0.2); height:'+tamanhoTela+'px; width:100%; z-index:999;} .dentroLightBox {line-height:20px; background-color: #fff; width: 450px; padding:30px; margin:15px; border-radius:10px; -moz-border-radius:10px; -webkit-border-radius:10px; border:3px solid #F3781F; line-height:20px; font-size: 12px; line-height:20px;}';
		
		var modoListaIco = '<img class="gridIco" height="15" width=15" src=http://icons.iconarchive.com/icons/visualpharm/icons8-metro-style/32/Timeline-List-Grid-List-icon.png>';
		var modoBalaoIco = '<img class="balaoIco"  height="15" width="15" src= http://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Speech_balloon.svg/50px-Speech_balloon.svg.png>';
		var divHolderBalao = '<div  class="holderBalao"></div>';
		var divMenuModo = '<div  class="menu-modos">Modo de visualização: ' + modoListaIco + '  ' + modoBalaoIco + '</div>';
		var fundoBlack = '<div class="fundoPreto"></div>';

		var arrFotos = [];
		var fotos = [];
		var fotoUnica = [];
		var arrAvaliacao = [];
		var avaliacaoUnica = [];
		var arrDatas = [];
		var dataUnica = [];
		var arrDepoimento = [];
		var arrDepoimentoCurto = [];
		var depoimentoUnico = [];
		var arrNome = [];	
		var arrCurtir =[];
		var botaoC = [];
		var posicaoItem = [];
		
		var posicionarBaloes = function() {
		
			var totalAvaliacoes = jQuery('.poi-reviews .poi-review').length;
			var totalAvaliacoesDiv = jQuery('.poi-reviews .poi-review');
			
			var botao = jQuery('.poi-reviews .poi-review button[data-place_id]');
			
			for (var i = 1; i < totalAvaliacoes; i++) {				
				botaoC[i] = botao[i-1];
				arrFotos[i] = jQuery(totalAvaliacoesDiv[i]).find('.author-photo-canvas .lazy');
				arrAvaliacao[i] = jQuery(totalAvaliacoesDiv[i]).find('.rating-stars-label').html();
				arrDatas[i] = jQuery(totalAvaliacoesDiv[i]).find('.review-date').html();
				arrDepoimento[i] = jQuery(totalAvaliacoesDiv[i]).find('.review-text').html();
				arrNome[i] = jQuery(totalAvaliacoesDiv[i]).find('.review-author-name a').html();
				arrCurtir[i] = jQuery(totalAvaliacoesDiv[i]).find('.people-thumbs-up em').html();

				//Acessando imagens e as validando
				fotos[i] = jQuery(arrFotos[i]).attr('data-original');
				if (typeof fotos[i] === 'undefined') {
						fotos[i] = ('https://s3-sa-east-1.amazonaws.com/localapp/apps/tooltipuser/files/img.png');
				}

				//Iniciando div de cada balao
				fotoUnica[i] = '<div class="boxBalao" ><img class="holderFotos" " height="170" width="170" src="' + fotos[i] + '" />';
				avaliacaoUnica[i] = '';

				//Criando estrelas 				
				for (var k = 0; k < (arrAvaliacao[i]); k++) {
						avaliacaoUnica[i] += '<img height="10" width="10" src="http://png-2.findicons.com/files/icons/2146/realistik_reloaded/16/bookmark.png" /> ';
				}

				if (arrAvaliacao[i] < 5) {
						for (var p = 0; p < (5 - arrAvaliacao[i]); p++){
							avaliacaoUnica[i] += '<img height="10" width="10" src="http://png.findicons.com/files/icons/1676/primo/128/star_none.png" /> ';
						}								
				}

				//Criando depoimento e verificando tamanho
				if (arrDepoimento[i].length > 50) {
						arrDepoimentoCurto[i] = (arrDepoimento[i].substr(0, 45) + ' ...</br><div href="#" class="verMais" idComentario=' + i + '>  +Ver Mais</div>');
				}else{
						arrDepoimentoCurto[i] = arrDepoimento[i];
				}
				
				depoimentoUnico[i] = '<div class="depoimentoUnico">'+ arrDepoimentoCurto[i]; + '</div>'
				//Implementando todos os itens do balão
				jQuery('.holderBalao').append(fotoUnica[i] + '<ul class="ulFotoUnica">' + 
				avaliacaoUnica[i] + ' ' + 
				arrDatas[i] + '</ul>'+ 
				depoimentoUnico[i] + '</div>'
				)
				
				//Guardando número de likes
				if(typeof arrCurtir[i] === 'undefined'){
				arrCurtir[i] = 0; 
				}
				
				//Guardando numero do comentário
				posicaoItem[i] = i;	
			};
			
			//------------------Click Função Ver Mais------------------//
			jQuery('.verMais')
					.click(function () {
							lightBox(jQuery(this).attr('idComentario'), 
							jQuery(document).scrollTop()
							);
			});		
		};		
		
		//------------------Função lightbox------------------//
		var lightBox = function(nItem, posicaoScroll) {
			
			jQuery('body').prepend(fundoBlack);
		
			var popUp = jQuery('<div class="divLightBox"><a href="#" class="btnFecharlb"></a><div class="dentroLightBox"><h1>'+
				arrNome[nItem]+'</h1></br><img widht="100" height="100" src="'+
				fotos[nItem]+'"></img></br>'+ 
				avaliacaoUnica[nItem] + 
				arrDatas[nItem]  + '</br></br>'+ 
				arrDepoimento[nItem]  +  '</br> </br>' + botaoC[nItem].outerHTML+ '<span style=" margin-left:11px; margin-top:5px; display: inline-block; color:#F3781F;">' +
				arrCurtir[nItem]+ '</span> <span style=" display: inline-block; color:#8D8D8D;"> pessoas curtiram esse comentário </span>'+
				'</div></div>'
			);
			
			jQuery('body').prepend(popUp);
			
			//Listener botão fechar light box
			jQuery('.btnFecharlb')
						.click(function () {		
						event.preventDefault();
								jQuery(this).parent().fadeOut().remove();
								jQuery('.fundoPreto').fadeOut().remove();
			});
			jQuery('.divLightBox').css('top',posicaoScroll+200);
			
			//Mostrar LightBox
			jQuery('.divLightBox').fadeIn();	
		};
		
		var acoesIcones = function() {
			
			//------------------Definir Listener para os icones ------------------//
			jQuery('.gridIco').click(function () {
				jQuery('.balaoIco').css({ 'border': '1px solid #999'});
				jQuery(this) .css({'border': '1px solid #F3781F' });
				jQuery('.poi-review') .fadeIn('fast' );
				jQuery('.holderBalao').fadeOut('fast');
			});

			jQuery('.balaoIco').click(function () {								
				jQuery('.gridIco').css({'border': '1px solid #999'});
				jQuery(this).css({'border': '1px solid #F3781F'});
				jQuery('.poi-review').fadeOut('fast');
				jQuery('.holderBalao').fadeIn('fast');
			});
			
			jQuery('.poi-reviews hr').css({'border-top':'1px dotted #ccc', 'border-bottom':'1px solid white'});
			
		}
	
        var execute = function ()  {		
			localUtil.loadJsCssFile(estilo, 'codecss');
			jQuery('.poi-reviews .poi-reviews-title').next().html(divMenuModo);
			jQuery('.menu-modos').after(divHolderBalao);			
			jQuery('.poi-review').css('display','block');	
			jQuery('.holderBalao').css('display','none');	
			posicionarBaloes();
			acoesIcones();		
        };
        return {
                execute: execute
        };
};

var app = {

        "clientId": "reviewDisplay",
        "appId": "reviewDisplay",
        "type": 3,
        "matchPath": "/local/.*/",
        "enabled": true

};
localanalytics.localapp.includeApp(app);