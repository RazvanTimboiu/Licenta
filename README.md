# Licenta

_This repository showcases my bachelor's thesis._

# Abstract

The world keeps changing. As technology evolves, it transforms the way we
communicate. Everything happens online right now. New data is generated every
day, increasing the volume of information shared on the web. This leads to a great
question... How can we filter out deceiving content from the information we consume?

# What is this paper about ?

This paper aims to contribute to the creation of a partially or fully automated
alternative for the verification of information distributed on social networks in Romania, mainly focusing on detecting news with misleading content.

# Structure

Throughout the first chapter, we described why fake news represents a problem
for Romanian society. The second chapter introduces some NLP concepts so that the
reader is familiarized with concepts that will be used in future chapters. The third
chapter presents related work and a quick overview of the situation we are currently
in. The fourth chapter introduces our proposed approach for detecting fake news
and describes the whole data gathering process, along with training details for the
chosen models. The fifth chapter presents an app that is built based on our models,
to make it easier to verify news and gather more data. The sixth chapter presents the
results we obtained with various models, and the last chapter concludes the paper
and paves the way for future work.

# Main contributions

Main contributions are as follows:

-   We collected over 50,000 news articles that we cleaned, labeled, and used to
    train five classification models.

-   We have introduced a new class for satire articles.
-   We tried different architectures for the proposed models, evaluated their
    performance, and discussed the results produced by each architecture.
-   We have designed and implemented an application that facilitates the process of collecting and labeling news articles so that in the future we can
    build larger and better quality data sets.
-   We introduced a CNN-LSTM hybrid model. It gets much better results than
    models based on LSTM or GRU and trains faster.

_The paper is written in Romanian so if you're an English speaker and need help understanding something feel free to reach out to me._

# Demo

https://user-images.githubusercontent.com/62222747/145687221-db2a7fc8-6578-4308-a8ab-e0fca7f0c3e4.mp4

# Running the Ionic client

To install missing packages use:

```
npm install
```

After installing the packages run the following command to launch the Ionic client:

```
ionic serve
```

# Endpoints & Usage

_This section will be updated after I deploy the API._
