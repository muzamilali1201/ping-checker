const ping = require("ping");
const Ping = require("../model/Ping");
const Site = require("../model/Site");
const cron = require("node-cron");
const mailSender = require("../utils/mailSender");
const Auth = require("../model/Auth");

const scheduledJob = (website) => {
  cron.schedule("*/20 * * * * *", async () => {
    try {
      const response = await ping.promise.probe(website.url);
      const pingToSite = await Site.findOne({ url: website.url });

      console.log(`Pinging - ${website.url} website`);

      if (response && response.alive === false && pingToSite.online == true) {
        const user = await Auth.findOne({ _id: website.userid });
        const mailInformation = {
          to: user.email,
          subject: "",
          text: "",
        };
        mailInformation.subject = "Your website is down";
        mailInformation.text = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Website Down Alert</title>
          <style>
            /* CSS styles for the email */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              border-radius: 10px;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #dc3545; /* Red color for alert */
              text-align: center;
            }
            p {
              color: #555;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
            }
            .button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Website Down Alert</h1>
            <p>We're sorry to inform you that your website is currently down. Our monitoring system detected that your website is not accessible at the moment.</p>
            <p>Please take the necessary actions to resolve the issue as soon as possible to ensure your website's uptime and user experience.</p>
            <p>If you have any questions or need assistance, feel free to contact our support team.</p>
            <p>Thank you for your attention.</p>
          </div>
        </body>
        </html>
        
        `;
        mailSender(mailInformation);
        pingToSite.online = false;
        await pingToSite.save();
      } else if (
        response &&
        response.alive === true &&
        pingToSite.online == false
      ) {
        const user = await Auth.findOne({ _id: website.userid });
        const mailInformation = {
          to: user.email,
          subject: "",
          text: "",
        };
        mailInformation.subject = "Your website is up now!";
        mailInformation.text = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Website Up Alert</title>
          <style>
            /* CSS styles for the email */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8f8f8;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              border-radius: 10px;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #4caf50; /* Green color for success */
              text-align: center;
            }
            p {
              color: #555;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              background-color: #4caf50; /* Green color for success */
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
            }
            .button:hover {
              background-color: #45a049; /* Darker green color on hover */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Website Up Alert</h1>
            <p>We're happy to inform you that your website is now up and running smoothly. Our monitoring system detected that your website is accessible again.</p>
            <p>Thank you for your patience while we resolved the issue. Your website is now fully operational, and users can access it as usual.</p>
            <p>If you have any further questions or concerns, please don't hesitate to reach out to our support team.</p>
            <p>Thank you for choosing our services.</p>
            <div style="text-align: center;">
              <a href="https://example.com" class="button">Contact Support</a>
            </div>
          </div>
        </body>
        </html>
        `;
        mailSender(mailInformation);
        pingToSite.online = true;
      }
      await Ping.create({
        userid: website.userid,
        url: website.url,
        alive: response ? response.alive : false,
        ipAddress: response ? response.numeric_host : undefined,
        responseTime: response ? response.time.toString() : "unknown",
        responseTripTime: response ? response.avg.toString() : "unknown",
      });
    } catch (error) {
      console.error("Error occurred while pinging:", error);
    }
  });
};

const pingScheduler = async () => {
  try {
    const sites = await Site.find();
    sites.forEach((site) => {
      scheduledJob(site);
    });
  } catch (error) {
    console.error("Error occurred while fetching sites:", error);
  }
};

module.exports = { scheduledJob, pingScheduler };
