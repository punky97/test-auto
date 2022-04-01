const TIME_ZONE = [
    {
        value: 'Etc/GMT+12',
        name: 'International Date Line West',
    },
    {
        value: 'Pacific/Pago_Pago',
        name: 'American Samoa',
    },
    {
        value: 'Pacific/Midway',
        name: 'Midway Island',
    },
    {
        value: 'Pacific/Honolulu',
        name: 'Hawaii',
    },
    {
        value: 'Pacific/Marquesas',
        name: 'Pacific/Marquesas',
    },
    {
        value: 'Pacific/Gambier',
        name: 'Pacific/Gambier',
    },
    {
        value: 'America/Juneau',
        name: 'Alaska',
    },
    {
        value: 'America/Los_Angeles',
        name: 'Pacific Time (US & Canada)',
    },
    {
        value: 'America/Tijuana',
        name: 'Tijuana',
    },
    {
        value: 'America/Phoenix',
        name: 'Arizona',
    },
    {
        value: 'America/Chihuahua',
        name: 'Chihuahua',
    },
    {
        value: 'America/Mazatlan',
        name: 'Mazatlan',
    },
    {
        value: 'America/Denver',
        name: 'Mountain Time (US & Canada)',
    },
    {
        value: 'America/Guatemala',
        name: 'Central America',
    },
    {
        value: 'America/Chicago',
        name: 'Central Time (US & Canada)',
    },
    {
        value: 'America/Mexico_City',
        name: 'Guadalajara, Mexico City',
    },
    {
        value: 'America/Monterrey',
        name: 'Monterrey',
    },
    {
        value: 'America/Regina',
        name: 'Saskatchewan',
    },
    {
        value: 'America/Bogota',
        name: 'Bogota',
    },
    {
        value: 'America/New_York',
        name: 'Eastern Time (US & Canada)',
    },
    {
        value: 'America/Indiana/Indianapolis',
        name: 'Indiana (East)',
    },
    {
        value: 'America/Lima',
        name: 'Lima, Quito',
    },
    {
        value: 'America/Halifax',
        name: 'Atlantic Time (Canada)',
    },
    {
        value: 'America/Caracas',
        name: 'Caracas',
    },
    {
        value: 'America/Guyana',
        name: 'Georgetown',
    },
    {
        value: 'America/La_Paz',
        name: 'La Paz',
    },
    {
        value: 'America/Puerto_Rico',
        name: 'Puerto Rico',
    },
    {
        value: 'America/Santiago',
        name: 'Santiago',
    },
    {
        value: 'America/St_Johns',
        name: 'Newfoundland',
    },
    {
        value: 'America/Sao_Paulo',
        name: 'Brasilia',
    },
    {
        value: 'America/Argentina/Buenos_Aires',
        name: 'Buenos Aires',
    },
    {
        value: 'America/Godthab',
        name: 'Greenland',
    },
    {
        value: 'America/Montevideo',
        name: 'Montevideo',
    },
    {
        value: 'Atlantic/South_Georgia',
        name: 'Mid-Atlantic',
    },
    {
        value: 'Atlantic/Azores',
        name: 'Azores',
    },
    {
        value: 'Atlantic/Cape_Verde',
        name: 'Cape Verde Is.',
    },
    {
        value: 'Africa/Casablanca',
        name: 'Casablanca',
    },
    {
        value: 'Europe/Dublin',
        name: 'Dublin',
    },
    {
        value: 'Europe/London',
        name: 'Edinburgh, London',
    },
    {
        value: 'Europe/Lisbon',
        name: 'Lisbon',
    },
    {
        value: 'Africa/Monrovia',
        name: 'Monrovia',
    },
    {
        value: 'Etc/UTC',
        name: 'UTC',
    },
    {
        value: 'Europe/Amsterdam',
        name: 'Amsterdam',
    },
    {
        value: 'Europe/Belgrade',
        name: 'Belgrade',
    },
    {
        value: 'Europe/Berlin',
        name: 'Berlin',
    },
    {
        value: 'Europe/Zurich',
        name: 'Bern, Zurich',
    },
    {
        value: 'Europe/Bratislava',
        name: 'Bratislava',
    },
    {
        value: 'Europe/Brussels',
        name: 'Brussels',
    },
    {
        value: 'Europe/Budapest',
        name: 'Budapest',
    },
    {
        value: 'Europe/Copenhagen',
        name: 'Copenhagen',
    },
    {
        value: 'Europe/Ljubljana',
        name: 'Ljubljana',
    },
    {
        value: 'Europe/Madrid',
        name: 'Madrid',
    },
    {
        value: 'Europe/Paris',
        name: 'Paris',
    },
    {
        value: 'Europe/Prague',
        name: 'Prague',
    },
    {
        value: 'Europe/Rome',
        name: 'Rome',
    },
    {
        value: 'Europe/Sarajevo',
        name: 'Sarajevo',
    },
    {
        value: 'Europe/Skopje',
        name: 'Skopje',
    },
    {
        value: 'Europe/Stockholm',
        name: 'Stockholm',
    },
    {
        value: 'Europe/Vienna',
        name: 'Vienna',
    },
    {
        value: 'Europe/Warsaw',
        name: 'Warsaw',
    },
    {
        value: 'Africa/Algiers',
        name: 'West Central Africa',
    },
    {
        value: 'Europe/Zagreb',
        name: 'Zagreb',
    },
    {
        value: 'Europe/Athens',
        name: 'Athens',
    },
    {
        value: 'Europe/Bucharest',
        name: 'Bucharest',
    },
    {
        value: 'Africa/Cairo',
        name: 'Cairo',
    },
    {
        value: 'Africa/Harare',
        name: 'Harare',
    },
    {
        value: 'Europe/Helsinki',
        name: 'Helsinki',
    },
    {
        value: 'Asia/Jerusalem',
        name: 'Jerusalem',
    },
    {
        value: 'Europe/Kaliningrad',
        name: 'Kaliningrad',
    },
    {
        value: 'Europe/Kiev',
        name: 'Kyiv',
    },
    {
        value: 'Africa/Johannesburg',
        name: 'Pretoria',
    },
    {
        value: 'Europe/Riga',
        name: 'Riga',
    },
    {
        value: 'Europe/Sofia',
        name: 'Sofia',
    },
    {
        value: 'Europe/Tallinn',
        name: 'Tallinn',
    },
    {
        value: 'Europe/Vilnius',
        name: 'Vilnius',
    },
    {
        value: 'Asia/Baghdad',
        name: 'Baghdad',
    },
    {
        value: 'Europe/Istanbul',
        name: 'Istanbul',
    },
    {
        value: 'Asia/Kuwait',
        name: 'Kuwait',
    },
    {
        value: 'Europe/Minsk',
        name: 'Minsk',
    },
    {
        value: 'Europe/Moscow',
        name: 'Moscow, St. Petersburg',
    },
    {
        value: 'Africa/Nairobi',
        name: 'Nairobi',
    },
    {
        value: 'Asia/Riyadh',
        name: 'Riyadh',
    },
    {
        value: 'Europe/Volgograd',
        name: 'Volgograd',
    },
    {
        value: 'Asia/Tehran',
        name: 'Tehran',
    },
    {
        value: 'Asia/Muscat',
        name: 'Abu Dhabi, Muscat',
    },
    {
        value: 'Asia/Baku',
        name: 'Baku',
    },
    {
        value: 'Europe/Samara',
        name: 'Samara',
    },
    {
        value: 'Asia/Tbilisi',
        name: 'Tbilisi',
    },
    {
        value: 'Asia/Yerevan',
        name: 'Yerevan',
    },
    {
        value: 'Asia/Kabul',
        name: 'Kabul',
    },
    {
        value: 'Asia/Yekaterinburg',
        name: 'Ekaterinburg',
    },
    {
        value: 'Asia/Karachi',
        name: 'Islamabad, Karachi',
    },
    {
        value: 'Asia/Tashkent',
        name: 'Tashkent',
    },
    {
        value: 'Asia/Kolkata',
        name: 'Chennai, Kolkata, Mumbai, New Delhi',
    },
    {
        value: 'Asia/Colombo',
        name: 'Sri Jayawardenepura',
    },
    {
        value: 'Asia/Kathmandu',
        name: 'Kathmandu',
    },
    {
        value: 'Asia/Almaty',
        name: 'Almaty',
    },
    {
        value: 'Asia/Dhaka',
        name: 'Astana, Dhaka',
    },
    {
        value: 'Asia/Urumqi',
        name: 'Urumqi',
    },
    {
        value: 'Asia/Rangoon',
        name: 'Rangoon',
    },
    {
        value: 'Asia/Bangkok',
        name: 'Bangkok, Hanoi',
    },
    {
        value: 'Asia/Jakarta',
        name: 'Jakarta',
    },
    {
        value: 'Asia/Krasnoyarsk',
        name: 'Krasnoyarsk',
    },
    {
        value: 'Asia/Novosibirsk',
        name: 'Novosibirsk',
    },
    {
        value: 'Asia/Shanghai',
        name: 'Beijing',
    },
    {
        value: 'Asia/Chongqing',
        name: 'Chongqing',
    },
    {
        value: 'Asia/Hong_Kong',
        name: 'Hong Kong',
    },
    {
        value: 'Asia/Irkutsk',
        name: 'Irkutsk',
    },
    {
        value: 'Asia/Kuala_Lumpur',
        name: 'Kuala Lumpur',
    },
    {
        value: 'Australia/Perth',
        name: 'Perth',
    },
    {
        value: 'Asia/Singapore',
        name: 'Singapore',
    },
    {
        value: 'Asia/Taipei',
        name: 'Taipei',
    },
    {
        value: 'Asia/Ulaanbaatar',
        name: 'Ulaanbaatar',
    },
    {
        value: 'Asia/Tokyo',
        name: 'Osaka, Sapporo, Tokyo',
    },
    {
        value: 'Asia/Seoul',
        name: 'Seoul',
    },
    {
        value: 'Asia/Yakutsk',
        name: 'Yakutsk',
    },
    {
        value: 'Australia/Adelaide',
        name: 'Adelaide',
    },
    {
        value: 'Australia/Darwin',
        name: 'Darwin',
    },
    {
        value: 'Australia/Brisbane',
        name: 'Brisbane',
    },
    {
        value: 'Australia/Melbourne',
        name: 'Canberra, Melbourne',
    },
    {
        value: 'Pacific/Guam',
        name: 'Guam',
    },
    {
        value: 'Australia/Hobart',
        name: 'Hobart',
    },
    {
        value: 'Pacific/Port_Moresby',
        name: 'Port Moresby',
    },
    {
        value: 'Australia/Sydney',
        name: 'Sydney',
    },
    {
        value: 'Asia/Vladivostok',
        name: 'Vladivostok',
    },
    {
        value: 'Asia/Magadan',
        name: 'Magadan',
    },
    {
        value: 'Pacific/Noumea',
        name: 'New Caledonia',
    },
    {
        value: 'Pacific/Guadalcanal',
        name: 'Solomon Is.',
    },
    {
        value: 'Asia/Srednekolymsk',
        name: 'Srednekolymsk',
    },
    {
        value: 'Pacific/Auckland',
        name: 'Auckland, Wellington',
    },
    {
        value: 'Pacific/Fiji',
        name: 'Fiji',
    },
    {
        value: 'Asia/Kamchatka',
        name: 'Kamchatka',
    },
    {
        value: 'Pacific/Majuro',
        name: 'Marshall Is.',
    },
    {
        value: 'Pacific/Chatham',
        name: 'Chatham Is.',
    },
    {
        value: 'Pacific/Tongatapu',
        name: "Nuku'alofa",
    },
    {
        value: 'Pacific/Apia',
        name: 'Samoa',
    },
    {
        value: 'Pacific/Fakaofo',
        name: 'Tokelau Is.',
    },
]