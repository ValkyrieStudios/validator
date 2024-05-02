'use strict';

/* eslint-disable max-len */

const pre = (prefix:string, arr:string[]) => arr.map(val => `${prefix}/${val}`);

const SET = new Set([
    ...pre('Africa', ['Abidjan', 'Accra', 'Bamako', 'Banjul', 'Conakry', 'Dakar', 'Freetown', 'Lome', 'Nouakchott', 'Ouagadougou', 'Timbuktu', 'Algiers', 'Bissau', 'Cairo', 'Casablanca', 'Ceuta', 'El_Aaiun', 'Johannesburg', 'Maseru', 'Mbabane', 'Juba', 'Khartoum', 'Lagos', 'Bangui', 'Brazzaville', 'Douala', 'Kinshasa', 'Libreville', 'Luanda', 'Malabo', 'Niamey', 'Porto-Novo', 'Maputo', 'Blantyre', 'Bujumbura', 'Gaborone', 'Harare', 'Kigali', 'Lubumbashi', 'Lusaka', 'Monrovia', 'Nairobi', 'Addis_Ababa', 'Asmara', 'Asmera', 'Dar_es_Salaam', 'Djibouti', 'Kampala', 'Mogadishu', 'Ndjamena', 'Sao_Tome', 'Tripoli', 'Tunis', 'Windhoek']),
    ...pre('Atlantic', ['Reykjavik', 'St_Helena', 'Azores', 'Bermuda', 'Canary', 'Cape_Verde', 'Faroe', 'Faeroe', 'Madeira', 'South_Georgia', 'Stanley', 'Jan_Mayen']),
    ...pre('America/Argentina', ['Buenos_Aires', 'Catamarca', 'ComodRivadavia', 'Cordoba', 'Jujuy', 'La_Rioja', 'Mendoza', 'Rio_Gallegos', 'Salta', 'San_Juan', 'San_Luis', 'Tucuman', 'Ushuaia']),
    ...pre('America/Indiana', ['Indianapolis', 'Knox', 'Marengo', 'Petersburg', 'Tell_City', 'Vevay', 'Vincennes', 'Winamac']),
    ...pre('America/Kentucky', ['Louisville', 'Monticello']),
    ...pre('America/North_Dakota', ['Beulah', 'Center', 'New_Salem']),
    ...pre('America', ['Adak', 'Atka', 'Anchorage', 'Araguaina', 'Buenos_Aires', 'Catamarca', 'Cordoba', 'Rosario', 'Jujuy', 'Mendoza', 'Asuncion', 'Bahia', 'Bahia_Banderas', 'Barbados', 'Belem', 'Belize', 'Boa_Vista', 'Bogota', 'Boise', 'Cambridge_Bay', 'Campo_Grande', 'Cancun', 'Caracas', 'Cayenne', 'Chicago', 'Chihuahua', 'Ciudad_Juarez', 'Costa_Rica', 'Cuiaba', 'Danmarkshavn', 'Dawson', 'Dawson_Creek', 'Denver', 'Shiprock', 'Detroit', 'Edmonton', 'Yellowknife', 'Eirunepe', 'El_Salvador', 'Fort_Nelson', 'Fortaleza', 'Glace_Bay', 'Goose_Bay', 'Grand_Turk', 'Guatemala', 'Guayaquil', 'Guyana', 'Halifax', 'Havana', 'Hermosillo', 'Fort_Wayne', 'Indianapolis', 'Knox_IN', 'Inuvik', 'Iqaluit', 'Pangnirtung', 'Jamaica', 'Juneau', 'Louisville', 'La_Paz', 'Lima', 'Los_Angeles', 'Maceio', 'Managua', 'Manaus', 'Martinique', 'Matamoros', 'Mazatlan', 'Menominee', 'Merida', 'Metlakatla', 'Mexico_City', 'Miquelon', 'Moncton', 'Monterrey', 'Montevideo', 'New_York', 'Nome', 'Noronha', 'Nuuk', 'Godthab', 'Ojinaga', 'Panama', 'Atikokan', 'Cayman', 'Coral_Harbour', 'Paramaribo', 'Phoenix', 'Creston', 'Port-au-Prince', 'Porto_Velho', 'Puerto_Rico', 'Anguilla', 'Antigua', 'Aruba', 'Blanc-Sablon', 'Curacao', 'Dominica', 'Grenada', 'Guadeloupe', 'Kralendijk', 'Lower_Princes', 'Marigot', 'Montserrat', 'Port_of_Spain', 'St_Barthelemy', 'St_Kitts', 'St_Lucia', 'St_Thomas', 'St_Vincent', 'Tortola', 'Virgin', 'Punta_Arenas', 'Rankin_Inlet', 'Recife', 'Regina', 'Resolute', 'Rio_Branco', 'Porto_Acre', 'Santarem', 'Santiago', 'Santo_Domingo', 'Sao_Paulo', 'Scoresbysund', 'Sitka', 'St_Johns', 'Swift_Current', 'Tegucigalpa', 'Thule', 'Tijuana', 'Ensenada', 'Santa_Isabel', 'Toronto', 'Montreal', 'Nassau', 'Nipigon', 'Thunder_Bay', 'Vancouver', 'Whitehorse', 'Winnipeg', 'Rainy_River', 'Yakutat']),
    ...pre('Antarctica', ['Casey', 'Davis', 'Macquarie', 'Mawson', 'Palmer', 'Rothera', 'Troll', 'Syowa', 'Vostok', 'McMurdo', 'South_Pole', 'DumontDUrville']),
    ...pre('Asia', ['Almaty', 'Amman', 'Anadyr', 'Aqtau', 'Aqtobe', 'Ashgabat', 'Ashkhabad', 'Atyrau', 'Baghdad', 'Baku', 'Bangkok', 'Phnom_Penh', 'Vientiane', 'Barnaul', 'Beirut', 'Bishkek', 'Chita', 'Choibalsan', 'Colombo', 'Damascus', 'Dhaka', 'Dacca', 'Dili', 'Dubai', 'Muscat', 'Dushanbe', 'Famagusta', 'Gaza', 'Hebron', 'Ho_Chi_Minh', 'Saigon', 'Hong_Kong', 'Hovd', 'Irkutsk', 'Jakarta', 'Jayapura', 'Jerusalem', 'Tel_Aviv', 'Kabul', 'Kamchatka', 'Karachi', 'Kathmandu', 'Katmandu', 'Khandyga', 'Kolkata', 'Calcutta', 'Krasnoyarsk', 'Kuching', 'Brunei', 'Macau', 'Macao', 'Magadan', 'Makassar', 'Ujung_Pandang', 'Manila', 'Nicosia', 'Novokuznetsk', 'Novosibirsk', 'Omsk', 'Oral', 'Pontianak', 'Pyongyang', 'Qatar', 'Bahrain', 'Qostanay', 'Qyzylorda', 'Riyadh', 'Aden', 'Kuwait', 'Sakhalin', 'Samarkand', 'Seoul', 'Shanghai', 'Chongqing', 'Chungking', 'Harbin', 'Singapore', 'Kuala_Lumpur', 'Srednekolymsk', 'Taipei', 'Tashkent', 'Tbilisi', 'Tehran', 'Thimphu', 'Thimbu', 'Tokyo', 'Tomsk', 'Ulaanbaatar', 'Ulan_Bator', 'Urumqi', 'Kashgar', 'Ust-Nera', 'Vladivostok', 'Yakutsk', 'Yangon', 'Rangoon', 'Yekaterinburg', 'Yerevan', 'Istanbul']),
    ...pre('US', ['Aleutian', 'Alaska', 'Central', 'Mountain', 'Michigan', 'East-Indiana', 'Indiana-Starke', 'Pacific', 'Eastern', 'Arizona', 'Hawaii', 'Samoa']),
    ...pre('Indian', ['Antananarivo', 'Comoro', 'Mayotte', 'Christmas', 'Mahe', 'Reunion', 'Cocos', 'Chagos', 'Maldives', 'Kerguelen', 'Mauritius']),
    ...pre('Australia', ['Adelaide', 'South', 'Brisbane', 'Queensland', 'Broken_Hill', 'Yancowinna', 'Darwin', 'North', 'Eucla', 'Hobart', 'Currie', 'Tasmania', 'Lindeman', 'Lord_Howe', 'LHI', 'Melbourne', 'Victoria', 'Perth', 'West', 'Sydney', 'ACT', 'Canberra', 'NSW']),
    ...pre('Europe', ['Nicosia', 'Andorra', 'Astrakhan', 'Athens', 'Belgrade', 'Ljubljana', 'Podgorica', 'Sarajevo', 'Skopje', 'Zagreb', 'Berlin', 'Copenhagen', 'Oslo', 'Stockholm', 'Brussels', 'Amsterdam', 'Luxembourg', 'Bucharest', 'Budapest', 'Chisinau', 'Tiraspol', 'Dublin', 'Gibraltar', 'Helsinki', 'Mariehamn', 'Istanbul', 'Kaliningrad', 'Kirov', 'Kyiv', 'Kiev', 'Uzhgorod', 'Zaporozhye', 'Lisbon', 'London', 'Belfast', 'Guernsey', 'Isle_of_Man', 'Jersey', 'Madrid', 'Malta', 'Minsk', 'Moscow', 'Paris', 'Monaco', 'Prague', 'Bratislava', 'Riga', 'Rome', 'San_Marino', 'Vatican', 'Samara', 'Saratov', 'Simferopol', 'Sofia', 'Tallinn', 'Tirane', 'Ulyanovsk', 'Vienna', 'Vilnius', 'Volgograd', 'Warsaw', 'Zurich', 'Busingen', 'Vaduz']),
    ...pre('Pacific', ['Apia', 'Auckland', 'Bougainville', 'Chatham', 'Easter', 'Efate', 'Fakaofo', 'Fiji', 'Galapagos', 'Gambier', 'Guadalcanal', 'Pohnpei', 'Ponape', 'Guam', 'Saipan', 'Honolulu', 'Johnston', 'Kanton', 'Enderbury', 'Kiritimati', 'Kosrae', 'Kwajalein', 'Marquesas', 'Nauru', 'Niue', 'Norfolk', 'Noumea', 'Pago_Pago', 'Midway', 'Samoa', 'Palau', 'Pitcairn', 'Port_Moresby', 'Chuuk', 'Truk', 'Yap', 'Rarotonga', 'Tahiti', 'Tarawa', 'Funafuti', 'Majuro', 'Wake', 'Wallis', 'Tongatapu']),
    ...pre('Brazil', ['West', 'DeNoronha', 'Acre', 'East']),
    ...pre('Canada', ['Mountain', 'Atlantic', 'Saskatchewan', 'Newfoundland', 'Eastern', 'Pacific', 'Yukon', 'Central']),
    ...pre('Etc', ['GMT', 'GMT+0', 'GMT-0', 'GMT0', 'Greenwich', 'GMT+1', 'GMT+10', 'GMT+11', 'GMT+12', 'GMT+2', 'GMT+3', 'GMT+4', 'GMT+5', 'GMT+6', 'GMT+7', 'GMT+8', 'GMT+9', 'GMT-1', 'GMT-10', 'GMT-11', 'GMT-12', 'GMT-13', 'GMT-14', 'GMT-2', 'GMT-3', 'GMT-4', 'GMT-5', 'GMT-6', 'GMT-7', 'GMT-8', 'GMT-9', 'UTC', 'UCT', 'Universal', 'Zulu']),
    ...pre('Mexico', ['BajaSur', 'General', 'BajaNorte']),
    ...pre('Chile', ['Continental', 'EasterIsland']),
    ...pre('Arctic', ['Longyearbyen']),
    'Iceland',
    'Egypt',
    'Libya',
    'Navajo',
    'Cuba',
    'Jamaica',
    'Hongkong',
    'Israel',
    'ROK',
    'PRC',
    'Singapore',
    'ROC',
    'Iran',
    'Japan',
    'CET',
    'CST6CDT',
    'EET',
    'EST',
    'EST5EDT',
    'GMT',
    'GMT+0',
    'GMT-0',
    'GMT0',
    'Greenwich',
    'UCT',
    'UTC',
    'Universal',
    'Zulu',
    'Eire',
    'Turkey',
    'Portugal',
    'GB',
    'GB-Eire',
    'W-SU',
    'Poland',
    'HST',
    'MET',
    'MST',
    'MST7MDT',
    'PST8PDT',
    'NZ',
    'NZ-CHAT',
    'Kwajalein',
    'WET',
]);

/**
 * Validate that a provided value is a time_zone string
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vTimeZone (val:unknown):val is string {
    return SET.has(val as string);
}

export {vTimeZone, vTimeZone as default};
