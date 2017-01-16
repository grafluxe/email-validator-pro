/*jslint regexp: true*/

/**
 * @author Leandro Silva | Grafluxe
 * @license MIT license | Copyright (c) 2012-2015 Leandro Silva, http://www.grafluxe.com/doc/license.txt
 * @file Supports module (AMD/CJS) and window use.
 */

(function (win) {
	"use strict";
	
	/**
	 * Defines the modular object. Do not rename this function as it is used as 
	 * the export for modules and the window object. Place all logic inside this
	 * function and pass in dependencies as arguments.
	 */
	function modular() {
		var ValidateEmail,
			whitelist,
			blacklist;

		/**
		 * @class
		 * @classdesc Validates an email address against most RFC standards. See the email address <a href="http://en.wikipedia.org/wiki/E-mail_address#Local_part" target="_blank">wiki.</a><br><br>
		Valid email addresses that are supported:<br>

		<blockquote>
			niceandsimple@example.com<br>
			niceandsimple@example123-4.com<br>
			niceandsimple@123example.com<br>
			niceandsimple@ex.example.com<br>
			niceandsimple@ex.xx.xx.example.com<br>
			very.common@example.com<br>
			a.little.lengthy.but.fine@dept.example.com<br>
			disposable.style.email.with+symbol@example.com<br>
			other.email-with-dash@example.com<br>
			"much.more unusual"@example.com<br>
			"very.unusual.@.unusual.com"@example.com<br>
			admin@mailserver1<br>
			#!$%&\'*+-/=?^_`{}|~@example.org<br>
			" "@example.org<br>
			üñîçøðé@example.com<br>
			üñîçøðé@üñîçøðé.com<br>
			"not"@example.com<br>
			jsmith@[192.168.2.1]<br>
			jsmith@[IPv6:2001:db8::1]<br>
			postbox@com<br>
			!#$%&\'*+-/=?^_`{}|~@example.org<br>
			"()<>[]:,;@\\\"!#$%&\'*+-/=?^_`{}| ~.a"@example.org<br>
			"()<>[]:,;@\\!#$%&\'*+-/=?^_`{}| ~.a"@example.org<br>
			abc."defghi".xyz@example.com<br>
			abc."d\\efghi".xyz@example.com<br>
			"abcdefghixyz"@example.com<br>
			email@example.com<br>
			firstname.lastname@example.com<br>
			email@subdomain.example.com<br>
			firstname+lastname@example.com<br>
			email@123.123.123.123<br>
			email@[123.123.123.123]<br>
			"email"@example.com<br>
			1234567890@example.com<br>
			email@example-one.com<br>
			_______@example.com<br>
			email@example.co.jp<br>
			firstname-lastname@example.com<br>
			very.unusual."@".unusual.com@example.com<br>
		</blockquote>

		Valid email addresses that are not supported:<br>

		<blockquote>
			"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com
			"()<>[]:,;@\"!#$%&\'*+-/=?^_`{}| ~.a"@example.org
			abc."d\"efghi".xyz@example.com
			much."more\ unusual"@example.com
			very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com
			john.smith(comment)@example.com
			(comment)john.smith@example.com
		</blockquote>
		 */
		ValidateEmail = function () {};

		/**
		 * Checks whether an email address is valid.
		 * @param   {String} email 
		 * @returns {Boolean}
		 */
		ValidateEmail.validAddress = function (email) {
			var pass = whitelist().test(email);

			if (pass) {
				pass = !blacklist().test(email);
			}

			return pass;
		};

		whitelist = function () {
			return (/^(?=\s)|^(?:(?!.+\.{2,})(?!\.)(?:[\w.!#$%&'*+\-\/=?\^`{|} ~]|[^\x00-\x7F])+[^\."]@|^"(?:[\w.!#$%&'*+\-\/=?\^`{|} ~(),:;<>@\[\]]|[^\x00-\x7F])+"@|(?:[\w.!#$%&'*+\-\/=?\^`{|} ~]|[^\x00-\x7F])+\."(?:[\w.!#$%&'*+\-\/=?\^`{|} ~"(),:;<>\\@\[\]]|[^\x00-\x7F])+"\.(?:[\w.!#$%&'*+\-\/=?\^`{|} ~]|[^\x00-\x7F])+@)(?!-)(?!.*-\.)(?:[a-zA-Z0-9-.]|[^\x00-\x7F])+$|^".+"@.+|.+@\[(?:\w+\.|\w+:){3}.+\]/);
		};

		blacklist = function () {
			return (/^@|^\s|@\[?(?=\d).*\d{4,}|"(?!.+\\").+".+"/);
		};
		
		return ValidateEmail;
	}
	
	//========================================================================================
	
	/**
	 * Adds support for module and window use. Pass in dependency paths into the modulePaths 
	 * array and include the matching window object paths in the windowObjects array. The 
	 * windowName param expects your Class name. No need to edit anything in the if statement.
	 */
	var modulesPaths = [],
		windowObjects = [],
		windowName = "ValidateEmail";

	if ((win.define || {}).amd) {
		win.define(modulesPaths, function () { return modular.apply(null, arguments); });
	} else if (typeof module === "object" && module.exports) {
		modulesPaths.forEach(function (el, i) { modulesPaths[i] = require(modulesPaths[i]); });
		module.exports = modular.apply(null, modulesPaths);
	} else {
		win[windowName] = modular.apply(null, windowObjects);
	}
}(this));