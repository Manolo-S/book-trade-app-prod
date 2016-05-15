'use strict';

(function bookListFun() {
	var authors;
	var book;
	var bookId;
	var imageLink;
	var user = store.get('user');                        //['twitter', '12345', 'Jan']; // placeholder for now, will later be used for twitter or facebook userid
	var addNewBookUrl = 'https://book-trade-ms.herokuapp.com/add-new-book';

	function authorsFun(author, index) {
		if (index === book.authors.length - 1) {
			authors += author;
		} else {
			authors += author + ', ';
		}
	}

	function isbn13Fun (identifier){
		if (identifier.type === 'ISBN_13'){
			bookId = 'ISBN-13: ' + identifier.identifier;
		}
	}

	function handleResponse(response) {
		$('#content').empty();
		for (var i = 0; i < response.items.length; i++) {
			var item = response.items[i]; 
			authors = '';
			book = item.volumeInfo;
			var lang = languageCodes[book.language];
			var bookIdArr = book.industryIdentifiers;
			if (bookIdArr && bookIdArr.length === 1){ // pre-isbn era books can have a non-ISBN identifier e.g. OSU 
				bookId = bookIdArr[0].identifier; 
			} else if (bookIdArr){        //if a book has more than one identifier it has a isbn10 and a isbn13 number, 
				bookIdArr.map(isbn13Fun); //every pre 2007 (=== pre isbn13) book that has an isbn10 number also has an isbn13 number 
			}                             //beginning with 978 so we only use the isbn 13 number in this case
			bookId = (bookIdArr === undefined ? '' : bookId); //some books have no industry identifier;
			var div = '<div class="book">'; //start format book display
			div += '<div class="row">';
			div += '<div class="col-sm-3">';
			if (book.imageLinks){
				div += '<img src="' + book["imageLinks"]["smallThumbnail"] + '" alt="book cover">';
				imageLink = book["imageLinks"]["smallThumbnail"];
			} else {
				imageLink = 'no-image'; //some books have a link to an image but it's just a white block, so decided not to display anything if the book has no imagelink
			}	
			div += '</div>'; // col-sm-3
			div += '<section class="col-sm-9 book-details">';
			div += '<cite class="book-title">' + book.title + ' ' + '</cite>';
			div += '<button type="button" class="btn btn-primary btn-xs add-button">Add book</button>';
			if (book.authors){
				book.authors.map(authorsFun);
				div += '<p class="authors">by ' + authors + '</p>';
			}
			div += '<p>' + book.publishedDate + '</p>';
			if (book.pageCount){
				div += '<p>' + book.pageCount + ' pages</p>';
			}
			div += '<p>' + 'Language: ' + lang + '</p>';
			div += '<p>' + bookId + '</p>';
			div += '<span>{"owner": "' + user + '", "image": "' + imageLink + '", "title": "' + book.title;
			div += '", "authors": "' + authors + '", "publishedDate": "' + book.publishedDate;
			div += '", "pages": "' + book.pageCount + '", "language": "' + lang + '", "industryIdentifier": "' + bookId + '", "requestedBy": "", "timestamp": ' + Date.now() + '}</span>';
			div += '</section>'; //col-sm-9
			div += '</div>'; // row
			div += '</div>'; //end format book display
			$('#content').append(div);
		}

		$('.add-button').click(function(e){
			var target = $(e.target);
			$(target).text('Book added').css('background-color', 'green');
			var bookObj = JSON.parse(target.siblings('span').text());
			$.post(addNewBookUrl, {data: [bookObj]});
		});
	}


	function findBook() {
		var searchStr = $('#search-box').val();
		var searchURL = encodeURI('https://www.googleapis.com/books/v1/volumes?q=' + searchStr);
		$.getJSON(searchURL, handleResponse);
	}


	$('#search-button').on('keypress click', function(e) {
		if (e.which === 13 || e.type === 'click') {findBook();};
	});

	$('#search-box').keypress(function(e) {
		if (e.which === 13) {findBook();}
	});

	var languageCodes = {
		ab: 'Abkhaz ',
		aa: 'Afar ',
		af: 'Afrikaans ',
		ak: 'Akan ',
		sq: 'Albanian ',
		am: 'Amharic ',
		ar: 'Arabic ',
		an: 'Aragonese ',
		hy: 'Armenian ',
		as: 'Assamese ',
		av: 'Avaric ',
		ae: 'Avestan ',
		ay: 'Aymara ',
		az: 'Azerbaijani ',
		bm: 'Bambara ',
		ba: 'Bashkir ',
		eu: 'Basque ',
		be: 'Belarusian ',
		bn: 'Bengali, Bangla ',
		bh: 'Bihari ',
		bi: 'Bislama ',
		bs: 'Bosnian ',
		br: 'Breton ',
		bg: 'Bulgarian ',
		my: 'Burmese ',
		ca: 'Catalan, Valencian ',
		ch: 'Chamorro ',
		ce: 'Chechen ',
		ny: 'Chichewa, Chewa, Nyanja ',
		zh: 'Chinese ',
		cv: 'Chuvash ',
		kw: 'Cornish ',
		co: 'Corsican ',
		cr: 'Cree ',
		hr: 'Croatian ',
		cs: 'Czech ',
		da: 'Danish ',
		dv: 'Divehi, Dhivehi, Maldivian ',
		nl: 'Dutch ',
		dz: 'Dzongkha ',
		en: 'English ',
		eo: 'Esperanto ',
		et: 'Estonian ',
		ee: 'Ewe ',
		fo: 'Faroese ',
		fj: 'Fijian ',
		fi: 'Finnish ',
		fr: 'French ',
		ff: 'Fula, Fulah, Pulaar, Pular ',
		gl: 'Galician ',
		ka: 'Georgian ',
		de: 'German ',
		el: 'Greek (modern) ',
		gn: 'Guaraní ',
		gu: 'Gujarati ',
		ht: 'Haitian, Haitian Creole ',
		ha: 'Hausa ',
		he: 'Hebrew (modern) ',
		hz: 'Herero ',
		hi: 'Hindi ',
		ho: 'Hiri Motu ',
		hu: 'Hungarian ',
		ia: 'Interlingua ',
		id: 'Indonesian ',
		ie: 'Interlingue ',
		ga: 'Irish ',
		ig: 'Igbo ',
		ik: 'Inupiaq ',
		io: 'Ido ',
		is: 'Icelandic ',
		it: 'Italian ',
		iu: 'Inuktitut ',
		ja: 'Japanese ',
		jv: 'Javanese ',
		kl: 'Kalaallisut, Greenlandic ',
		kn: 'Kannada ',
		kr: 'Kanuri ',
		ks: 'Kashmiri ',
		kk: 'Kazakh ',
		km: 'Khmer ',
		ki: 'Kikuyu, Gikuyu ',
		rw: 'Kinyarwanda ',
		ky: 'Kyrgyz ',
		kv: 'Komi ',
		kg: 'Kongo ',
		ko: 'Korean ',
		ku: 'Kurdish ',
		kj: 'Kwanyama, Kuanyama ',
		la: 'Latin ',
		lb: 'Luxembourgish, Letzeburgesch ',
		lg: 'Ganda ',
		li: 'Limburgish, Limburgan, Limburger ',
		ln: 'Lingala ',
		lo: 'Lao ',
		lt: 'Lithuanian ',
		lu: 'Luba-Katanga ',
		lv: 'Latvian ',
		gv: 'Manx ',
		mk: 'Macedonian ',
		mg: 'Malagasy ',
		ms: 'Malay ',
		ml: 'Malayalam ',
		mt: 'Maltese ',
		mi: 'Māori ',
		mr: 'Marathi (Marāṭhī) ',
		mh: 'Marshallese ',
		mn: 'Mongolian ',
		na: 'Nauru ',
		nv: 'Navajo, Navaho ',
		nd: 'Northern Ndebele ',
		ne: 'Nepali ',
		ng: 'Ndonga ',
		nb: 'Norwegian Bokmål ',
		nn: 'Norwegian Nynorsk ',
		no: 'Norwegian ',
		ii: 'Nuosu ',
		nr: 'Southern Ndebele ',
		oc: 'Occitan ',
		oj: 'Ojibwe, Ojibwa ',
		cu: 'Old Church Slavonic, Church Slavonic, Old Bulgarian ',
		om: 'Oromo ',
		or: 'Oriya ',
		os: 'Ossetian, Ossetic ',
		pa: 'Panjabi, Punjabi ',
		pi: 'Pāli ',
		fa: 'Persian (Farsi) ',
		pl: 'Polish ',
		ps: 'Pashto, Pushto ',
		pt: 'Portuguese ',
		qu: 'Quechua ',
		rm: 'Romansh ',
		rn: 'Kirundi ',
		ro: 'Romanian ',
		ru: 'Russian ',
		sa: 'Sanskrit (Saṁskṛta) ',
		sc: 'Sardinian ',
		sd: 'Sindhi ',
		se: 'Northern Sami ',
		sm: 'Samoan ',
		sg: 'Sango ',
		sr: 'Serbian ',
		gd: 'Scottish Gaelic, Gaelic ',
		sn: 'Shona ',
		si: 'Sinhala, Sinhalese ',
		sk: 'Slovak ',
		sl: 'Slovene ',
		so: 'Somali ',
		st: 'Southern Sotho ',
		es: 'Spanish, Castilian ',
		su: 'Sundanese ',
		sw: 'Swahili ',
		ss: 'Swati ',
		sv: 'Swedish ',
		ta: 'Tamil ',
		te: 'Telugu ',
		tg: 'Tajik ',
		th: 'Thai ',
		ti: 'Tigrinya ',
		bo: 'Tibetan Standard, Tibetan, Central ',
		tk: 'Turkmen ',
		tl: 'Tagalog ',
		tn: 'Tswana ',
		to: 'Tonga (Tonga Islands) ',
		tr: 'Turkish ',
		ts: 'Tsonga ',
		tt: 'Tatar ',
		tw: 'Twi ',
		ty: 'Tahitian ',
		ug: 'Uyghur, Uighur ',
		uk: 'Ukrainian ',
		ur: 'Urdu ',
		uz: 'Uzbek ',
		ve: 'Venda ',
		vi: 'Vietnamese ',
		vo: 'Volapük ',
		wa: 'Walloon ',
		cy: 'Welsh ',
		wo: 'Wolof ',
		fy: 'Western Frisian ',
		xh: 'Xhosa ',
		yi: 'Yiddish ',
		yo: 'Yoruba ',
		za: 'Zhuang, Chuang ',
		zu: 'Zulu '
	};
}) ();