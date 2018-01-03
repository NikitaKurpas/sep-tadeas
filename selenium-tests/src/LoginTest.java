import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import po.LoginPage;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

public class LoginTest {

  private static WebDriver driver;
  private static LoginPage login;

  @BeforeClass
  public static void setUp() throws MalformedURLException {
    DesiredCapabilities dc = DesiredCapabilities.chrome();
    dc.setJavascriptEnabled(true);
    driver = new RemoteWebDriver(dc);
    login = new LoginPage(driver);
  }

  @Test
  public void loginTest() throws InterruptedException {
    login.goTo();
    login.login("email@email.cz", "12345");
  }

  @AfterClass
  public static void tearDown() throws InterruptedException {
    driver.quit();
  }

}
