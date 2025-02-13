 /* eslint-disable max-len */

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

function pre<P extends string, Z extends string> (prefix: P, zones: Z[]): `${P}/${Z}`[] {
    return zones.map(zone => `${prefix}/${zone}` as `${P}/${Z}`);
}

/**
 * MARK: Constants
 */

export const CONTINENTS     = ['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA'] as const;
export const COUNTRY_ALPHA2 = ['AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'AX', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CD', 'CG', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TM', 'TC', 'TV', 'TR', 'UG', 'UA', 'AE', 'GB', 'UM', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW'] as const;
export const COUNTRY_ALPHA3 = ['AFG', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'ALA', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'CPV', 'KHM', 'CMR', 'CAN', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COD', 'COG', 'COK', 'CRI', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'CIV', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'SWZ', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MKD', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'ROU', 'RUS', 'RWA', 'REU', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TKM', 'TCA', 'TUV', 'TUR', 'UGA', 'UKR', 'ARE', 'GBR', 'UMI', 'USA', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE'] as const;
export const TIMEZONES      = [...pre('Africa', ['Abidjan', 'Accra', 'Bamako', 'Banjul', 'Conakry', 'Dakar', 'Freetown', 'Lome', 'Nouakchott', 'Ouagadougou', 'Timbuktu', 'Algiers', 'Bissau', 'Cairo', 'Casablanca', 'Ceuta', 'El_Aaiun', 'Johannesburg', 'Maseru', 'Mbabane', 'Juba', 'Khartoum', 'Lagos', 'Bangui', 'Brazzaville', 'Douala', 'Kinshasa', 'Libreville', 'Luanda', 'Malabo', 'Niamey', 'Porto-Novo', 'Maputo', 'Blantyre', 'Bujumbura', 'Gaborone', 'Harare', 'Kigali', 'Lubumbashi', 'Lusaka', 'Monrovia', 'Nairobi', 'Addis_Ababa', 'Asmara', 'Asmera', 'Dar_es_Salaam', 'Djibouti', 'Kampala', 'Mogadishu', 'Ndjamena', 'Sao_Tome', 'Tripoli', 'Tunis', 'Windhoek']), ...pre('Atlantic', ['Reykjavik', 'St_Helena', 'Azores', 'Bermuda', 'Canary', 'Cape_Verde', 'Faroe', 'Faeroe', 'Madeira', 'South_Georgia', 'Stanley', 'Jan_Mayen']), ...pre('America/Argentina', ['Buenos_Aires', 'Catamarca', 'ComodRivadavia', 'Cordoba', 'Jujuy', 'La_Rioja', 'Mendoza', 'Rio_Gallegos', 'Salta', 'San_Juan', 'San_Luis', 'Tucuman', 'Ushuaia']), ...pre('America/Indiana', ['Indianapolis', 'Knox', 'Marengo', 'Petersburg', 'Tell_City', 'Vevay', 'Vincennes', 'Winamac']), ...pre('America/Kentucky', ['Louisville', 'Monticello']), ...pre('America/North_Dakota', ['Beulah', 'Center', 'New_Salem']), ...pre('America', ['Adak', 'Atka', 'Anchorage', 'Araguaina', 'Buenos_Aires', 'Catamarca', 'Cordoba', 'Rosario', 'Jujuy', 'Mendoza', 'Asuncion', 'Bahia', 'Bahia_Banderas', 'Barbados', 'Belem', 'Belize', 'Boa_Vista', 'Bogota', 'Boise', 'Cambridge_Bay', 'Campo_Grande', 'Cancun', 'Caracas', 'Cayenne', 'Chicago', 'Chihuahua', 'Ciudad_Juarez', 'Costa_Rica', 'Cuiaba', 'Danmarkshavn', 'Dawson', 'Dawson_Creek', 'Denver', 'Shiprock', 'Detroit', 'Edmonton', 'Yellowknife', 'Eirunepe', 'El_Salvador', 'Fort_Nelson', 'Fortaleza', 'Glace_Bay', 'Goose_Bay', 'Grand_Turk', 'Guatemala', 'Guayaquil', 'Guyana', 'Halifax', 'Havana', 'Hermosillo', 'Fort_Wayne', 'Indianapolis', 'Knox_IN', 'Inuvik', 'Iqaluit', 'Pangnirtung', 'Jamaica', 'Juneau', 'Louisville', 'La_Paz', 'Lima', 'Los_Angeles', 'Maceio', 'Managua', 'Manaus', 'Martinique', 'Matamoros', 'Mazatlan', 'Menominee', 'Merida', 'Metlakatla', 'Mexico_City', 'Miquelon', 'Moncton', 'Monterrey', 'Montevideo', 'New_York', 'Nome', 'Noronha', 'Nuuk', 'Godthab', 'Ojinaga', 'Panama', 'Atikokan', 'Cayman', 'Coral_Harbour', 'Paramaribo', 'Phoenix', 'Creston', 'Port-au-Prince', 'Porto_Velho', 'Puerto_Rico', 'Anguilla', 'Antigua', 'Aruba', 'Blanc-Sablon', 'Curacao', 'Dominica', 'Grenada', 'Guadeloupe', 'Kralendijk', 'Lower_Princes', 'Marigot', 'Montserrat', 'Port_of_Spain', 'St_Barthelemy', 'St_Kitts', 'St_Lucia', 'St_Thomas', 'St_Vincent', 'Tortola', 'Virgin', 'Punta_Arenas', 'Rankin_Inlet', 'Recife', 'Regina', 'Resolute', 'Rio_Branco', 'Porto_Acre', 'Santarem', 'Santiago', 'Santo_Domingo', 'Sao_Paulo', 'Scoresbysund', 'Sitka', 'St_Johns', 'Swift_Current', 'Tegucigalpa', 'Thule', 'Tijuana', 'Ensenada', 'Santa_Isabel', 'Toronto', 'Montreal', 'Nassau', 'Nipigon', 'Thunder_Bay', 'Vancouver', 'Whitehorse', 'Winnipeg', 'Rainy_River', 'Yakutat']), ...pre('Antarctica', ['Casey', 'Davis', 'Macquarie', 'Mawson', 'Palmer', 'Rothera', 'Troll', 'Syowa', 'Vostok', 'McMurdo', 'South_Pole', 'DumontDUrville']), ...pre('Asia', ['Almaty', 'Amman', 'Anadyr', 'Aqtau', 'Aqtobe', 'Ashgabat', 'Ashkhabad', 'Atyrau', 'Baghdad', 'Baku', 'Bangkok', 'Phnom_Penh', 'Vientiane', 'Barnaul', 'Beirut', 'Bishkek', 'Chita', 'Choibalsan', 'Colombo', 'Damascus', 'Dhaka', 'Dacca', 'Dili', 'Dubai', 'Muscat', 'Dushanbe', 'Famagusta', 'Gaza', 'Hebron', 'Ho_Chi_Minh', 'Saigon', 'Hong_Kong', 'Hovd', 'Irkutsk', 'Jakarta', 'Jayapura', 'Jerusalem', 'Tel_Aviv', 'Kabul', 'Kamchatka', 'Karachi', 'Kathmandu', 'Katmandu', 'Khandyga', 'Kolkata', 'Calcutta', 'Krasnoyarsk', 'Kuching', 'Brunei', 'Macau', 'Macao', 'Magadan', 'Makassar', 'Ujung_Pandang', 'Manila', 'Nicosia', 'Novokuznetsk', 'Novosibirsk', 'Omsk', 'Oral', 'Pontianak', 'Pyongyang', 'Qatar', 'Bahrain', 'Qostanay', 'Qyzylorda', 'Riyadh', 'Aden', 'Kuwait', 'Sakhalin', 'Samarkand', 'Seoul', 'Shanghai', 'Chongqing', 'Chungking', 'Harbin', 'Singapore', 'Kuala_Lumpur', 'Srednekolymsk', 'Taipei', 'Tashkent', 'Tbilisi', 'Tehran', 'Thimphu', 'Thimbu', 'Tokyo', 'Tomsk', 'Ulaanbaatar', 'Ulan_Bator', 'Urumqi', 'Kashgar', 'Ust-Nera', 'Vladivostok', 'Yakutsk', 'Yangon', 'Rangoon', 'Yekaterinburg', 'Yerevan', 'Istanbul']), ...pre('US', ['Aleutian', 'Alaska', 'Central', 'Mountain', 'Michigan', 'East-Indiana', 'Indiana-Starke', 'Pacific', 'Eastern', 'Arizona', 'Hawaii', 'Samoa']), ...pre('Indian', ['Antananarivo', 'Comoro', 'Mayotte', 'Christmas', 'Mahe', 'Reunion', 'Cocos', 'Chagos', 'Maldives', 'Kerguelen', 'Mauritius']), ...pre('Australia', ['Adelaide', 'South', 'Brisbane', 'Queensland', 'Broken_Hill', 'Yancowinna', 'Darwin', 'North', 'Eucla', 'Hobart', 'Currie', 'Tasmania', 'Lindeman', 'Lord_Howe', 'LHI', 'Melbourne', 'Victoria', 'Perth', 'West', 'Sydney', 'ACT', 'Canberra', 'NSW']), ...pre('Europe', ['Nicosia', 'Andorra', 'Astrakhan', 'Athens', 'Belgrade', 'Ljubljana', 'Podgorica', 'Sarajevo', 'Skopje', 'Zagreb', 'Berlin', 'Copenhagen', 'Oslo', 'Stockholm', 'Brussels', 'Amsterdam', 'Luxembourg', 'Bucharest', 'Budapest', 'Chisinau', 'Tiraspol', 'Dublin', 'Gibraltar', 'Helsinki', 'Mariehamn', 'Istanbul', 'Kaliningrad', 'Kirov', 'Kyiv', 'Kiev', 'Uzhgorod', 'Zaporozhye', 'Lisbon', 'London', 'Belfast', 'Guernsey', 'Isle_of_Man', 'Jersey', 'Madrid', 'Malta', 'Minsk', 'Moscow', 'Paris', 'Monaco', 'Prague', 'Bratislava', 'Riga', 'Rome', 'San_Marino', 'Vatican', 'Samara', 'Saratov', 'Simferopol', 'Sofia', 'Tallinn', 'Tirane', 'Ulyanovsk', 'Vienna', 'Vilnius', 'Volgograd', 'Warsaw', 'Zurich', 'Busingen', 'Vaduz']), ...pre('Pacific', ['Apia', 'Auckland', 'Bougainville', 'Chatham', 'Easter', 'Efate', 'Fakaofo', 'Fiji', 'Galapagos', 'Gambier', 'Guadalcanal', 'Pohnpei', 'Ponape', 'Guam', 'Saipan', 'Honolulu', 'Johnston', 'Kanton', 'Enderbury', 'Kiritimati', 'Kosrae', 'Kwajalein', 'Marquesas', 'Nauru', 'Niue', 'Norfolk', 'Noumea', 'Pago_Pago', 'Midway', 'Samoa', 'Palau', 'Pitcairn', 'Port_Moresby', 'Chuuk', 'Truk', 'Yap', 'Rarotonga', 'Tahiti', 'Tarawa', 'Funafuti', 'Majuro', 'Wake', 'Wallis', 'Tongatapu']), ...pre('Brazil', ['West', 'DeNoronha', 'Acre', 'East']), ...pre('Canada', ['Mountain', 'Atlantic', 'Saskatchewan', 'Newfoundland', 'Eastern', 'Pacific', 'Yukon', 'Central']), ...pre('Etc', ['GMT', 'GMT+0', 'GMT-0', 'GMT0', 'Greenwich', 'GMT+1', 'GMT+10', 'GMT+11', 'GMT+12', 'GMT+2', 'GMT+3', 'GMT+4', 'GMT+5', 'GMT+6', 'GMT+7', 'GMT+8', 'GMT+9', 'GMT-1', 'GMT-10', 'GMT-11', 'GMT-12', 'GMT-13', 'GMT-14', 'GMT-2', 'GMT-3', 'GMT-4', 'GMT-5', 'GMT-6', 'GMT-7', 'GMT-8', 'GMT-9', 'UTC', 'UCT', 'Universal', 'Zulu']), ...pre('Mexico', ['BajaSur', 'General', 'BajaNorte']), ...pre('Chile', ['Continental', 'EasterIsland']), ...pre('Arctic', ['Longyearbyen']), 'Iceland', 'Egypt', 'Libya', 'Navajo', 'Cuba', 'Jamaica', 'Hongkong', 'Israel', 'ROK', 'PRC', 'Singapore', 'ROC', 'Iran', 'Japan', 'CET', 'CST6CDT', 'EET', 'EST', 'EST5EDT', 'GMT', 'GMT+0', 'GMT-0', 'GMT0', 'Greenwich', 'UCT', 'UTC', 'Universal', 'Zulu', 'Eire', 'Turkey', 'Portugal', 'GB', 'GB-Eire', 'W-SU', 'Poland', 'HST', 'MET', 'MST', 'MST7MDT', 'PST8PDT', 'NZ', 'NZ-CHAT', 'Kwajalein', 'WET'] as const;

/**
 * Mark: Branded Types
 */

export type Continent       = (typeof CONTINENTS)[number];
export type ColorHex        = Brand<string, 'ColorHex'>;
export type CountryAlpha2   = (typeof COUNTRY_ALPHA2)[number];
export type CountryAlpha3   = (typeof COUNTRY_ALPHA3)[number];
export type DateString      = Brand<string, 'DateString'>;
export type EAN_8           = Brand<string, 'EAN_8'>;
export type EAN_13          = Brand<string, 'EAN_13'>;
export type EAN             = EAN_8 | EAN_13;
export type Email           = Brand<string, 'Email'>;
export type GeoLatitude     = Brand<number, 'GeoLatitude'>;
export type GeoLongitude    = Brand<number, 'GeoLongitude'>;
export type GUID            = Brand<string, 'GUID'>;
export type IP_V4           = Brand<string, 'IP_V4'>;
export type IP_V6           = Brand<string, 'IP_V6'>;
export type IP              = IP_V4 | IP_V6;
export type ISBN_10         = Brand<string, 'ISBN_10'>;
export type ISBN_13         = Brand<string, 'ISBN_13'>;
export type ISBN            = ISBN_10 | ISBN_13;
export type Phone           = Brand<string, 'Phone'>;
export type SSN             = Brand<string, 'SSN'>;
export type MAC             = Brand<string, 'MAC'>;
export type TimeZone        = (typeof TIMEZONES)[number];
export type ULID            = Brand<string, 'ULID'>;
export type UUID_1          = Brand<string, 'UUID_V1'>;
export type UUID_2          = Brand<string, 'UUID_V2'>;
export type UUID_3          = Brand<string, 'UUID_V3'>;
export type UUID_4          = Brand<string, 'UUID_V4'>;
export type UUID_5          = Brand<string, 'UUID_V5'>;
export type UUID            = UUID_1 | UUID_2 | UUID_3 | UUID_4 | UUID_5;

/**
 * MARK: Data
 */

/* Raw data type for input checking */
export type DataVal         = string | number | boolean | Date | symbol | null | unknown | DataObject | DataVal[]; /* eslint-disable-line */
export type DataObject      = {[key:string]: DataVal};
export type GenericObject   = {[key:string]:any};

/* Validation rule input data types */
export type RulesRawVal     = string | string[] | RulesRaw; /* eslint-disable-line */
export type RulesRaw        = {[key:string]: RulesRawVal};

/* Recursively remove the readonly modifier from all properties */
export type DeepMutable<T> =
  T extends string ? T :
  T extends number ? T :
  T extends boolean ? T :
  T extends bigint ? T :
  T extends symbol ? T :
  T extends null ? T :
  T extends undefined ? T :
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  T extends Function ? T :
  T extends object ? { -readonly [K in keyof T]: DeepMutable<T[K]> } :
  T;

/**
 * MARK: Inferrence
 */

/* Helper type that extracts a type predicate’s target type */
type ExtractGuard<T> =
  T extends (val: unknown, ...args: any[]) => val is infer R ? R : never;

/* Builds mapping from rules in dictionary */
type RuleMap<V extends {rules: Record<string, any>}> = {
    [K in keyof V['rules']]: ExtractGuard<V['rules'][K]>
};

/* Extracts rule name from a string (eg: "string|min:2", extract "string") */
type ExtractRuleName<S extends string> =
  S extends `${infer Word}|${infer _}` ? Word : /* eslint-disable-line @typescript-eslint/no-unused-vars */
  S extends `${infer Word}:${infer _}` ? Word : /* eslint-disable-line @typescript-eslint/no-unused-vars */
  S;

/* Removes leading "!" from string */
type RemoveNegation<S extends string> = S extends `!${infer Rest}` ? Rest : S;

/**
 * Given a rule string S, infer its type using the default rule type mapping.
 * If the rule begins with a "?" then we union with undefined.
 */
type InferRuleTypeFromStore<S extends string, V extends {rules: Record<string, any>}> =
  S extends `?${infer Rest}`
    ? (Rest extends '' ? undefined : InferRuleTypeFromStore<RemoveNegation<Rest>, V> | undefined)
    : ExtractRuleName<RemoveNegation<S>> extends keyof RuleMap<V>
      ? RuleMap<V>[ExtractRuleName<RemoveNegation<S>>]
      : unknown;

/**
 * Recursively infer the type for a schema.
 * - If the schema value is a string, we use InferRuleTypeFromStore.
 * - If it’s an array (conditional group), we take the union of the inferences.
 * - If it’s an object, we recursively map its keys.
 */
export type InferredSchema<S, V extends {rules: Record<string, any>} = {rules: object}> =
  S extends string ? InferRuleTypeFromStore<S, V> :
  S extends Array<infer U> ? InferredSchema<U, V> :
  S extends object ? { [K in keyof S]: InferredSchema<S[K], V> } : unknown;

/**
 * MARK: Validation
 */

export type ValidationError = {
    idx?:number;
    msg:string;
    params:DataVal[];
}

export type ValidationIterable = {
    unique: boolean;
    max: number;
    min: number;
    handler: {
        typ: (obj:any) => boolean;
        len: (obj:any) => number;
        val: (obj:any) => any[];
    };
}

export type ValidationRules = {
    iterable:ValidationIterable|false;
    list:  {
        type:string;
        params:unknown[];
        params_length:number;
        not:boolean;
    }[];
    list_length:number;
}

export type ValidationGroup = {
    key:string;
    sometimes:boolean;
    rules:ValidationRules[];
}

export type ValidationResult = {
    /**
     * Whether or not the validation was valid
     */
    is_valid:boolean;
    /**
     * Integer value defining how many fields were invalid in the provided data object
     */
    count:number;
    /**
     * Errors object which will be filled with the errors of the validation result if there are any.
     *
     * Take note: 'NO_DATA' is set when no data was passed to the validator.
     *
     * Example: {b: [{msg: 'number', params: []}]}
     */
    errors: 'NO_DATA' | {[key:string]:ValidationError[]};
}
