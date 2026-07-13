export const questions = [
  // ---- Core CCNA ports ----
  {
    text: "What port does FTP use for control?",
    answers: [
      { text: "20", result: "yellow" },
      { text: "21", result: "green" },
      { text: "69", result: "red" },
    ],
  },
  {
    text: "What port does FTP use for data transfer?",
    answers: [
      { text: "21", result: "yellow" },
      { text: "23", result: "red" },
      { text: "20", result: "green" },
    ],
  },
  {
    text: "What port does SSH use?",
    answers: [
      { text: "23", result: "yellow" },
      { text: "22", result: "green" },
      { text: "21", result: "red" },
    ],
  },
  {
    text: "What port does Telnet use?",
    answers: [
      { text: "22", result: "yellow" },
      { text: "3389", result: "red" },
      { text: "23", result: "green" },
    ],
  },
  {
    text: "What port does SMTP use?",
    answers: [
      { text: "25", result: "green" },
      { text: "110", result: "yellow" },
      { text: "587", result: "red" },
    ],
  },
  {
    text: "What port does DNS use?",
    answers: [
      { text: "67", result: "red" },
      { text: "53", result: "green" },
      { text: "68", result: "yellow" },
    ],
  },
  {
    text: "What port does a DHCP server listen on?",
    answers: [
      { text: "68", result: "yellow" },
      { text: "69", result: "red" },
      { text: "67", result: "green" },
    ],
  },
  {
    text: "What port does a DHCP client listen on?",
    answers: [
      { text: "67", result: "yellow" },
      { text: "68", result: "green" },
      { text: "53", result: "red" },
    ],
  },
  {
    text: "What port does TFTP use?",
    answers: [
      { text: "20", result: "red" },
      { text: "69", result: "green" },
      { text: "21", result: "yellow" },
    ],
  },
  {
    text: "What port does HTTP use?",
    answers: [
      { text: "443", result: "yellow" },
      { text: "80", result: "green" },
      { text: "8080", result: "red" },
    ],
  },
  {
    text: "What port does HTTPS use?",
    answers: [
      { text: "80", result: "yellow" },
      { text: "8443", result: "red" },
      { text: "443", result: "green" },
    ],
  },
  {
    text: "What port does POP3 use?",
    answers: [
      { text: "143", result: "yellow" },
      { text: "110", result: "green" },
      { text: "995", result: "red" },
    ],
  },
  {
    text: "What port does NTP use?",
    answers: [
      { text: "123", result: "green" },
      { text: "161", result: "yellow" },
      { text: "514", result: "red" },
    ],
  },
  {
    text: "What port does IMAP use?",
    answers: [
      { text: "993", result: "yellow" },
      { text: "110", result: "red" },
      { text: "143", result: "green" },
    ],
  },
  {
    text: "What port does SNMP use for agent polling?",
    answers: [
      { text: "162", result: "yellow" },
      { text: "161", result: "green" },
      { text: "389", result: "red" },
    ],
  },
  {
    text: "What port does SNMP use for traps?",
    answers: [
      { text: "161", result: "yellow" },
      { text: "162", result: "green" },
      { text: "514", result: "red" },
    ],
  },
  {
    text: "What port does BGP use?",
    answers: [
      { text: "179", result: "green" },
      { text: "89", result: "red" },
      { text: "520", result: "yellow" },
    ],
  },
  {
    text: "What port does LDAP use?",
    answers: [
      { text: "636", result: "yellow" },
      { text: "389", result: "green" },
      { text: "88", result: "red" },
    ],
  },
  {
    text: "What port does LDAPS (secure LDAP) use?",
    answers: [
      { text: "389", result: "yellow" },
      { text: "445", result: "red" },
      { text: "636", result: "green" },
    ],
  },
  {
    text: "What port does SMB use?",
    answers: [
      { text: "445", result: "green" },
      { text: "139", result: "yellow" },
      { text: "3389", result: "red" },
    ],
  },
  {
    text: "What port does Syslog use?",
    answers: [
      { text: "161", result: "yellow" },
      { text: "514", result: "green" },
      { text: "179", result: "red" },
    ],
  },
  {
    text: "What port does SMTP submission (client to server, secure) use?",
    answers: [
      { text: "25", result: "yellow" },
      { text: "587", result: "green" },
      { text: "465", result: "red" },
    ],
  },
  {
    text: "What port does IMAPS (secure IMAP) use?",
    answers: [
      { text: "143", result: "yellow" },
      { text: "995", result: "red" },
      { text: "993", result: "green" },
    ],
  },
  {
    text: "What port does POP3S (secure POP3) use?",
    answers: [
      { text: "995", result: "green" },
      { text: "993", result: "yellow" },
      { text: "110", result: "red" },
    ],
  },
  {
    text: "What port does RDP use?",
    answers: [
      { text: "5900", result: "yellow" },
      { text: "22", result: "red" },
      { text: "3389", result: "green" },
    ],
  },
  {
    text: "What port does Kerberos use?",
    answers: [
      { text: "88", result: "green" },
      { text: "389", result: "yellow" },
      { text: "49", result: "red" },
    ],
  },
  {
    text: "What port does TACACS+ use?",
    answers: [
      { text: "1812", result: "yellow" },
      { text: "49", result: "green" },
      { text: "88", result: "red" },
    ],
  },
  {
    text: "What port does RADIUS use for authentication?",
    answers: [
      { text: "1813", result: "yellow" },
      { text: "1812", result: "green" },
      { text: "49", result: "red" },
    ],
  },
  {
    text: "What port does RADIUS use for accounting?",
    answers: [
      { text: "1812", result: "yellow" },
      { text: "1813", result: "green" },
      { text: "1645", result: "red" },
    ],
  },
  {
    text: "What port does NetBIOS Session Service use?",
    answers: [
      { text: "137", result: "yellow" },
      { text: "445", result: "red" },
      { text: "139", result: "green" },
    ],
  },
  {
    text: "What port does NetBIOS Name Service use?",
    answers: [
      { text: "139", result: "yellow" },
      { text: "137", result: "green" },
      { text: "138", result: "red" },
    ],
  },
  {
    text: "What port does RIP use?",
    answers: [
      { text: "179", result: "red" },
      { text: "520", result: "green" },
      { text: "89", result: "yellow" },
    ],
  },
  {
    text: "What port does SIP use for VoIP signaling?",
    answers: [
      { text: "5061", result: "yellow" },
      { text: "5900", result: "red" },
      { text: "5060", result: "green" },
    ],
  },
  {
    text: "What port does secure SIP (SIP-TLS) use?",
    answers: [
      { text: "5060", result: "yellow" },
      { text: "5061", result: "green" },
      { text: "587", result: "red" },
    ],
  },

  // ---- Practice / scenario variations ----
  {
    text: "You're troubleshooting a device that can't resolve hostnames. Which port should you check?",
    answers: [
      { text: "67", result: "yellow" },
      { text: "53", result: "green" },
      { text: "68", result: "red" },
    ],
  },
  {
    text: "A PC just booted and is broadcasting for an IP address lease. What port does it send from?",
    answers: [
      { text: "67", result: "yellow" },
      { text: "68", result: "green" },
      { text: "69", result: "red" },
    ],
  },
  {
    text: "You need to securely manage a switch remotely via CLI. Which port should be open?",
    answers: [
      { text: "23", result: "yellow" },
      { text: "3389", result: "red" },
      { text: "22", result: "green" },
    ],
  },
  {
    text: "An older device only supports unencrypted remote CLI access. Which port is it using?",
    answers: [
      { text: "22", result: "yellow" },
      { text: "23", result: "green" },
      { text: "21", result: "red" },
    ],
  },
  {
    text: "A network monitoring server is polling router interface counters. Which port is it using?",
    answers: [
      { text: "161", result: "green" },
      { text: "162", result: "yellow" },
      { text: "514", result: "red" },
    ],
  },
  {
    text: "A router just sent an unsolicited alert to your NMS about a link going down. Which port did it use?",
    answers: [
      { text: "161", result: "yellow" },
      { text: "162", result: "green" },
      { text: "179", result: "red" },
    ],
  },
  {
    text: "Two ISP routers are exchanging routing information between autonomous systems. Which port?",
    answers: [
      { text: "89", result: "yellow" },
      { text: "520", result: "red" },
      { text: "179", result: "green" },
    ],
  },
  {
    text: "A switch is forwarding log messages to a central logging server. Which port?",
    answers: [
      { text: "162", result: "yellow" },
      { text: "514", result: "green" },
      { text: "123", result: "red" },
    ],
  },
  {
    text: "A router is syncing its clock to a time server. Which port?",
    answers: [
      { text: "123", result: "green" },
      { text: "53", result: "yellow" },
      { text: "161", result: "red" },
    ],
  },
  {
    text: "You're authenticating switch admin logins against a Cisco-proprietary AAA server. Which port?",
    answers: [
      { text: "1812", result: "yellow" },
      { text: "49", result: "green" },
      { text: "389", result: "red" },
    ],
  },
  {
    text: "You're authenticating logins against a standards-based AAA server instead. Which port?",
    answers: [
      { text: "49", result: "yellow" },
      { text: "1812", result: "green" },
      { text: "1433", result: "red" },
    ],
  },
  {
    text: "An admin is remoting into a Windows server's full desktop. Which port?",
    answers: [
      { text: "22", result: "red" },
      { text: "3389", result: "green" },
      { text: "23", result: "yellow" },
    ],
  },
  {
    text: "A file server share is being accessed from a Windows PC. Which port?",
    answers: [
      { text: "139", result: "yellow" },
      { text: "445", result: "green" },
      { text: "3389", result: "red" },
    ],
  },
  {
    text: "Which port range does FTP use: 20/21, 67/68, or 80/443?",
    answers: [
      { text: "67/68", result: "yellow" },
      { text: "20/21", result: "green" },
      { text: "80/443", result: "red" },
    ],
  },
  {
    text: "Which port pair is closer to DHCP: 67/68, 20/21, or 80/443?",
    answers: [
      { text: "20/21", result: "yellow" },
      { text: "80/443", result: "red" },
      { text: "67/68", result: "green" },
    ],
  },
  {
    text: "Which port is closer to HTTP vs HTTPS: is HTTPS 80 or 443?",
    answers: [
      { text: "80", result: "yellow" },
      { text: "8080", result: "red" },
      { text: "443", result: "green" },
    ],
  },
  {
    text: "Which port is closer to SSH: 22, 23, or 21?",
    answers: [
      { text: "23", result: "yellow" },
      { text: "21", result: "red" },
      { text: "22", result: "green" },
    ],
  },
  {
    text: "Which port is closer to SNMP polling: 161, 162, or 514?",
    answers: [
      { text: "162", result: "yellow" },
      { text: "514", result: "red" },
      { text: "161", result: "green" },
    ],
  },
  {
    text: "Which port is closer to BGP: 179, 89, or 520?",
    answers: [
      { text: "89", result: "yellow" },
      { text: "520", result: "red" },
      { text: "179", result: "green" },
    ],
  },
  {
    text: "Which port is closer to LDAP: 389, 636, or 88?",
    answers: [
      { text: "636", result: "yellow" },
      { text: "88", result: "red" },
      { text: "389", result: "green" },
    ],
  },
];