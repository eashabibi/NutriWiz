import React, { Fragment } from "react";
import Nav from "./Nav";
import Aboutimage from "../images/aboutimage.jpg"; // Make sure to import your image

const About = () => {
  return (
    <Fragment>
      <Nav />
      <div className="about-container">
        <div className="text-background">
          {" "}
          {/* Added div for background color */}
          <h1>About Nutriwiz</h1>
          <p>
            Welcome to Nutriwiz, your trusted companion on your journey to
            healthier eating. Our mission is to provide you with the knowledge
            and tools you need to make informed and healthy food choices.Your
            well-being is our priority, and we're committed to being your go-to
            source for all things nutrition.
          </p>
          <h2>Who We Are</h2>
          <p>
            Hi there, I'm Asha, the founder of Nutriwiz. I believe that
            knowledge is the key to making informed choices about what we eat,
            and that's why I created this platform. At Nutriwiz, we're
            passionate about providing you with accurate, easy-to-understand
            information about the foods you love.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to empower you with the knowledge you need to
            make healthier food choices. We want to make it easy for you to
            discover the ingredients and nutritional information of your
            favorite foods, so you can eat well and live well.
          </p>
          <h2>Why Nutriwiz?</h2>
          <p>
            Navigating the world of nutrition can be overwhelming. With so much
            conflicting information out there, it's hard to know what's best for
            your health. That's where Nutriwiz comes in. We're committed to
            delivering reliable and up-to-date information, helping you make
            informed decisions about your diet.
          </p>
          <h2>What We Offer</h2>
          <p>
            Nutriwiz is your one-stop destination for all things food and
            nutrition. Our user-friendly platform allows you to search for any
            food item and instantly access its ingredients and nutritional
            content. Whether you're looking to count calories, track macros, or
            simply learn more about what you're eating, Nutriwiz has you
            covered.
          </p>
          <h2>Our Commitment to Accuracy</h2>
          <p>
            We understand that your health is important, and we take our
            responsibility to provide accurate information seriously. Our team
            of nutrition experts and data scientists works tirelessly to ensure
            that the data you find on Nutriwiz is reliable and trustworthy.
          </p>
          <h2>Join Our Community</h2>
          <p>
            We invite you to become a part of our growing Nutriwiz community.
            Connect with like-minded individuals who share your passion for
            healthy living. Share your insights, recipes, and success stories
            with us.
          </p>
          <h2>Get in Touch</h2>
          <p>
            We value your feedback and suggestions. If you have any questions or
            ideas to improve Nutriwiz, always welcome to reach out. Your input
            helps us make Nutriwiz even better.Our customer support team is
            always ready to assist you. Your opinions matter, and we're
            committed to making Nutriwiz a platform that truly meets your needs.
            Stay connected with Nutriwiz on social media for the latest updates,
            tips, and inspiration.
          </p>
          <p>
            <p>&nbsp;</p>
            Thank you for choosing Nutriwiz as your nutrition resource. We look
            forward to being a part of your journey to a healthier, happier you.
          </p>
          <p>&nbsp;</p>
          <p class="last">
            Start exploring, start making healthier
            choices, and start thriving with Nutriwiz!
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
