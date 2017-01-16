/**
 * @author Leandro Silva | Grafluxe, 2012+2017
 * @license MIT license
 */

//jshint esversion:6, node:true

/**
 * Validates an email address against most RFC standards.
 * See the email address <a href="http://en.wikipedia.org/wiki/E-mail_address#Local_part" target="_blank">wiki</a>.
 *
 * @example
 * Valid email addresses that are supported:
 * <pre>
 *  niceandsimple@example.com
 *  niceandsimple@example123-4.com
 *  niceandsimple@ex.example.com
 *  niceandsimple@ex.xx.xx.example.com
 *  very.common@example.com
 *  a.little.lengthy.but.fine@dept.example.com
 *  disposable.style.email.with+symbol@example.com
 *  other.email-with-dash@example.com
 *  "much.more unusual"@example.com
 *  "very.unusual.@.unusual.com"@example.com
 *  #!$%&\'*+-/=?^_\`{}|~@example.org
 *  " "@example.org
 *  üñîçøðé@example.com
 *  üñîçøðé@üñîçøðé.com
 *  admin@mailserver1
 *  user@tt
 *  "hi"@example.com
 *  jsmith@[192.168.2.1]
 *  jsmith@[IPv6:2001:db8::1]
 *  postbox@com
 *  !#$%&\'*+-/=?^_\`{}|~@example.org
 *  "()<>[]:,;@\\\"!#$%&\'*+-/=?^_\`{}| ~.a"@example.org
 *  "()<>[]:,;@\\!#$%&\'*+-/=?^_\`{}| ~.a"@example.org
 *  abc."defghi".xyz@example.com
 *  abc."d\\efghi".xyz@example.com
 *  "abcdefghixyz"@example.com
 *  email@example.com
 *  firstname.lastname@example.com
 *  email@subdomain.example.com
 *  firstname+lastname@example.com
 *  email@123.123.123.123
 *  email@[123.123.123.123]
 *  "email"@example.com
 *  1234567890@example.com
 *  email@example-one.com
 *  _______@example.com
 *  email@example.co.jp
 *  firstname-lastname@example.com
 *  very.unusual."@".unusual.com@example.com
 *  john.smith(comment)@example.com
 *  (comment)john.smith@example.com
 *  "()<>[]:,;@\\\"!#$%&\'*+-/=?^_\`{}| ~.a"(comment)@example.org
 * </pre>
 *
 * Valid email addresses that are not supported:
 * <pre>
 *  "very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com
 *  "()<>[]:,;@\"!#$%&\'*+-/=?^_\`{}| ~.a"@example.org
 *  abc."d\"efghi".xyz@example.com
 *  much."more\ unusual"@example.com
 * </pre>
*/
class EmailValidatorPro {
  /**
   * Checks whether an email address is valid.
   * @param   {String}  address An email address.
   * @returns {Boolean}
   */
  isValid(address) {
    let whitelisted = this._whitelist(address),
        blacklisted = this._blacklist(address),
        tooLong = this._tooLong(address),
        validComments = this._comments(address);

    return (whitelisted && !blacklisted && !tooLong) || (!blacklisted && validComments);
  }

  /**
   * [[Description]]
   * @param   {String} address [[Description]]
   * @returns {Object} [[Description]]
   */
  getParts(address) {
    let mat = address.match(/[^@]+$/);

    return {
      local: address.substr(0, mat.index - 1),
      domain: mat[0]
    };
  }

  _whitelist(addr) {
    return /^(?=\s)|^(?:(?!.+\.{2,})(?!\.)(?:[\w.!#$%&'*+\-\/=?\^`{|} ~]|[^\x00-\x7F])+[^\."]@|^"(?:[\w.!#$%&'*+\-\/=?\^`{|} ~(),:;<>@\[\]]|[^\x00-\x7F])+"@|(?:[\w.!#$%&'*+\-\/=?\^`{|} ~]|[^\x00-\x7F])+\."(?:[\w.!#$%&'*+\-\/=?\^`{|} ~"(),:;<>\\@\[\]]|[^\x00-\x7F])+"\.(?:[\w.!#$%&'*+\-\/=?\^`{|} ~]|[^\x00-\x7F])+@)(?!-)(?!.*-\.)(?:[a-zA-Z0-9-.]|[^\x00-\x7F])+$|^".+"@.+|.+@\[(?:\w+\.|\w+:){3}.+\]/.test(addr);
  }

  _blacklist(addr) {
    return /^@|^\s|@\[?(?=\d).*\d{4,}|"(?!.+\\").+".+"/.test(addr);
  }

  _tooLong(addr) {
    let pts = this.getParts(addr);

    return (pts.domain.length >= 253 || pts.local.length >=64 || addr.length >= 254);
  }

  _comments(addr) {
    return /^\(.+\)|\(.+\)@/.test(addr.replace(/".+"/g, "-"));
  }

}

//Support CJS/Node
if (typeof module === "object" && module.exports) {
  module.exports = EmailValidatorPro;
}
