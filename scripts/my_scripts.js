$(document).ready(function(){

/*  New Additons for end

	Added more output for winning/loosing to the 'hand' object
	Added a restart button click to re-deal

    slightly more organization used sub objects for cardnames and suits for more readability

*/


	var used_cards = new Array();
	
	function card(name,suit,value) {
		this.name = name;
		this.suit = suit;
		this.value = value;
	}

	function suit(name) {
	    this.name = name;
	}

	function cardname(name, value) {
	    this.name = name;
	    this.value = value;
	}

    var Hearts = new suit('Hearts');
    var Diamonds = new suit('Diamonds');
    var	Clubs = new suit('Clubs');
    var Spades = new suit('Spades');

    var Ace = new cardname('Ace', 11);
    var Two = new cardname('Two', 2);
    var Three = new cardname('Three', 3);
    var Four = new cardname('Four', 4);
    var Five = new cardname('Five', 5);
    var Six = new cardname('Six', 6);
    var Seven = new cardname('Seven', 7);
    var Eight = new cardname('Eight', 8);
    var Nine = new cardname('Nine', 9);
    var Ten = new cardname('Ten', 10);
    var Jack = new cardname('Jack', 10);
    var Queen = new cardname('Queen', 10);
    var King = new cardname('King', 10);


	var deck = [

		new card(Ace.name, Hearts.name, Ace.value),
		new card(Two.name, Hearts.name, Two.value),
		new card(Three.name, Hearts.name, Three.value),
		new card(Four.name, Hearts.name, Four.value),
		new card(Five.name, Hearts.name, Five.value),
		new card(Six.name, Hearts.name, Six.value),
		new card(Seven.name, Hearts.name, Seven.value),
		new card(Eight.name, Hearts.name, Eight.value),
		new card(Nine.name, Hearts.name, Nine.value),
		new card(Ten.name, Hearts.name, Ten.value),
		new card(Jack.name, Hearts.name, Jack.value),
		new card(Queen.name, Hearts.name, Queen.value),
		new card(King.name, Hearts.name, King.value),

		new card(Ace.name, Diamonds.name, Ace.value),
		new card(Two.name, Diamonds.name, Two.value),
		new card(Three.name, Diamonds.name, Three.value),
		new card(Four.name, Diamonds.name, Four.value),
		new card(Five.name, Diamonds.name, Five.value),
		new card(Six.name, Diamonds.name, Six.value),
		new card(Seven.name, Diamonds.name, Seven.value),
		new card(Eight.name, Diamonds.name, Eight.value),
		new card(Nine.name, Diamonds.name, Nine.value),
		new card(Ten.name, Diamonds.name, Ten.value),
		new card(Jack.name, Diamonds.name, Jack.value),
		new card(Queen.name, Diamonds.name, Queen.value),
		new card(King.name, Diamonds.name, King.value),

		new card(Ace.name, Clubs.name, Ace.value),
		new card(Two.name, Clubs.name, Two.value),
		new card(Three.name, Clubs.name, Three.value),
		new card(Four.name, Clubs.name, Four.value),
		new card(Five.name, Clubs.name, Five.value),
		new card(Six.name, Clubs.name, Six.value),
		new card(Seven.name, Clubs.name, Seven.value),
		new card(Eight.name, Clubs.name, Eight.value),
		new card(Nine.name, Clubs.name, Nine.value),
		new card(Ten.name, Clubs.name, Ten.value),
		new card(Jack.name, Clubs.name, Jack.value),
		new card(Queen.name, Clubs.name, Queen.value),
		new card(King.name, Clubs.name, King.value),

		new card(Ace.name, Spades.name, Ace.value),
		new card(Two.name, Spades.name, Two.value),
		new card(Three.name, Spades.name, Three.value),
		new card(Four.name, Spades.name, Four.value),
		new card(Five.name, Spades.name, Five.value),
		new card(Six.name, Spades.name, Six.value),
		new card(Seven.name, Spades.name, Seven.value),
		new card(Eight.name, Spades.name, Eight.value),
		new card(Nine.name, Spades.name, Nine.value),
		new card(Ten.name, Spades.name, Ten.value),
		new card(Jack.name, Spades.name, Jack.value),
		new card(Queen.name, Spades.name, Queen.value),
		new card(King.name, Spades.name, King.value)

	];
	
	var hand = {
		cards : new Array(),
		current_total : 0,
		
		sumCardTotal: function(){
			this.current_total = 0;
			for(var i=0;i<this.cards.length;i++){
				var c = this.cards[i];
				this.current_total += c.value;
			}
			$("#hdrTotal").html("Total: " + this.current_total );
			
			if(this.current_total > 21){
				$("#btnStick").trigger("click");
				$("#imgResult").attr('src','images/x2.png');
				$("#hdrResult").html("BUST!")
							   .attr('class', 'lose');
			}else if(this.current_total == 21){
				$("#btnStick").trigger("click");
				$("#imgResult").attr('src','images/check.png');
				$("#hdrResult").html("BlackJack!")
							   .attr('class', 'win');
			}else if(this.current_total <= 21 && this.cards.length == 5){
				$("#btnStick").trigger("click");
				$("#imgResult").attr('src','images/check.png');
				$("#hdrResult").html("BlackJack - 5 card trick!")
							   .attr('class', 'win');
			}else{ }
		}
	};
	
	function getRandom(num){
		var my_num = Math.floor(Math.random()*num);
		return my_num;
	}
	
	function deal(){
		for(var i=0;i<2;i++){
			hit();
		}
	}
	
	function hit(){
		var good_card = false;
		do{
			var index = getRandom(52);
			if( !$.inArray(index, used_cards ) > -1 ){
				good_card = true;
				var c = deck[ index ];
				used_cards[used_cards.length] = index;
				hand.cards[hand.cards.length] = c;	
				
				var $d = $("<div>");
				$d.addClass("current_hand")
				  .appendTo("#my_hand");
						  
				$("<img>").attr('alt', c.name + ' of ' + c.suit )
						  .attr('title', c.name + ' of ' + c.suit )
						  .attr('src', 'images/cards/' + c.suit + '/' + c.name + '.jpg' )
						  .appendTo($d)
						  .fadeOut('slow')
						  .fadeIn('slow');
				
			}
		}while(!good_card);
		good_card = false;	  
		hand.sumCardTotal();
	}
	
	$("#btnDeal").click( function(){
		deal();
		$(this).toggle();
		$("#btnHit").toggle();
		$("#btnStick").toggle();
	});
	
	$("#btnHit").click( function(){
		hit();
	});
	
	function end(){
		$("#btnHit").toggle();
		$("#btnStick").toggle();
		$("#btnRestart").toggle();
	}
	
	$("#btnStick").click( function(){
		$("#hdrResult").html('Stick!')
					   .attr('class', 'win');
		$("#result").toggle();
		end();
	});
	
	$("#btnRestart").click( function(){
		$("#result").toggle();
		$(this).toggle();
		$("#my_hand").empty();
		$("#hdrResult").html('');
		$("#imgResult").attr('src','images/check.png');
		
		used_cards.length = 0;
		hand.cards.length = 0;
		hand.current_total = 0;
		
		$("#btnDeal").toggle()
					 .trigger('click');
	});
});