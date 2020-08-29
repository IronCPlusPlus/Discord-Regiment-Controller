
const Discord = require('discord.js');
exports.run = async (client, message) => {
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
        return message.reply("");
    
    var args = message.content.split(' ');

    var guild = message.guild;

    await message.delete();

    // console.log(args, args.length);

    if (args.length <= 1) 
    {
        return message.reply('Please Enter a Battalion Name');
    }
    args = args.splice(1);
    var battalionName = args.join(' ');

    var navyRole = await guild.roles.fetch('707101036023644200');
    var commanderRole = await guild.roles.create({
        data: {
            name: battalionName + ' Commander',
        },
        reason: 'Setting up: ' + battalionName
    });
    var officerRole = await guild.roles.create({
        data: {
            name: battalionName + ' Officers',
        },
        reason: 'Setting up: ' + battalionName
    });
    var ncoRole = await guild.roles.create({
        data: {
            name: battalionName + ' NCOs',
        },
        reason: 'Setting up: ' + battalionName
    });
    var trooperRole = await guild.roles.create({
        data: {
            name: battalionName,
        },
        reason: 'Setting up: ' + battalionName
    });
    var permissions = [
        {
            id: guild.roles.everyone,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
        {
            id: commanderRole.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'MOVE_MEMBERS', 'MENTION_EVERYONE', 'EMBED_LINKS', 'ATTACH_FILES', 'MANAGE_CHANNELS', 'MANAGE_ROLES'],
        },
        {
            id: officerRole.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'MOVE_MEMBERS', 'MENTION_EVERYONE', 'EMBED_LINKS', 'ATTACH_FILES'],
        },
        {
            id: ncoRole.id,
            allow: ['VIEW_CHANNEL'],
        },
        {
            id: trooperRole.id,
            allow: ['VIEW_CHANNEL'],
        },
    ];
    if (navyRole != undefined )
    {
        permissions.push({ id: navyRole.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'] });
    }
    var category = await guild.channels.create("◂── "+ battalionName +" ──▸", {
        type: "category",
        permissionOverwrites: permissions,
    });

    permissions.push({ id: trooperRole.id, allow: ['SEND_MESSAGES'] });

    var general = await guild.channels.create("general", {
        parent: category
    });
    await general.overwritePermissions(permissions, 'Setup General for:' + battalionName);

    var embed = new Discord.MessageEmbed();
    embed.setTitle("Battalion Setup");
    embed.setDescription("✅ Successful!");
    embed.addField("Commander Role", commanderRole.toString());
    embed.addField("Officer Role", officerRole.toString());
    embed.addField("NCOs Role", ncoRole.toString());
    embed.addField("Trooper Role", trooperRole.toString());

    await message.channel.send(embed);
};